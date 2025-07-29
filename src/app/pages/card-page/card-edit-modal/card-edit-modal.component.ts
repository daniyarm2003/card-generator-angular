import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, OnChanges, OnDestroy, OnInit, output, SimpleChanges, ViewChild } from '@angular/core';
import { CardCreationDTO, CardDTO, CardUpdateDTO, CardVariant } from '../../../types/cardDTO';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CARD_TYPE_NONE_ID, CardTypeDTO } from '../../../types/cardTypeDTO';
import { TrackedFileService } from '../../../services/tracked-file.service';
import { Subscription } from 'rxjs';
import { CardPreviewComponent } from "../card-preview/card-preview.component";
import { AddCardSubmission, CardPreviewProps, CardUpdateSubmission } from '../utils';

@Component({
  selector: 'app-card-edit-modal',
  imports: [CommonModule, ReactiveFormsModule, CardPreviewComponent],
  templateUrl: './card-edit-modal.component.html',
  styleUrl: './card-edit-modal.component.scss'
})
export class CardEditModalComponent implements OnInit, OnChanges, OnDestroy {
  public show = input.required<boolean>();
  public card = input<CardDTO>();

  public cardTypes = input.required<CardTypeDTO[]>();

  public submitLoading = input.required<boolean>();

  public onClose = output<void>();

  public onAddSubmit = output<AddCardSubmission>();
  public onEditSubmit = output<CardUpdateSubmission>();

  @ViewChild('cardImageSelector')
  public cardImageInput!: ElementRef<HTMLInputElement>;

  public selectedCardImageFile?: File;
  public selectedCardImageFileBlobUrl?: string;

  private variantValueChangeSubscription?: Subscription;

  public cardForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(64)]),
    number: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(9999)]),
    variant: new FormControl<CardVariant>('REGULAR', Validators.required),
    quote: new FormControl(''),
    effect: new FormControl(''),
    level: new FormControl(1),
    attack: new FormControl(0),
    health: new FormControl(0),
    typeId: new FormControl(CARD_TYPE_NONE_ID),
  });

  public constructor(private trackedFileService: TrackedFileService) {}

  ngOnInit() {
    const variantControl = this.cardForm.get('variant');

    if(variantControl) {
      this.applyVariantSpecificValidators(variantControl.value ?? 'NEBULA');
      this.variantValueChangeSubscription = variantControl.valueChanges.subscribe(variant => this.applyVariantSpecificValidators(variant ?? 'NEBULA'));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['show']?.currentValue) {
      const card = this.card();
      const variantControl = this.cardForm.get('variant');

      if(card) {
        variantControl?.disable();
      }
      else {
        variantControl?.enable();
      }

      this.cardForm.reset({
        name: card?.name ?? '',
        number: card?.number ?? 1,
        variant: card?.variant ?? 'REGULAR',
        quote: card?.quote ?? '',
        effect: card?.effect ?? '',
        level: card?.level ?? 1,
        attack: card?.attack ?? 0,
        health: card?.health ?? 0,
        typeId: card?.type.id ?? CARD_TYPE_NONE_ID
      });

      this.selectedCardImageFile = undefined;
      this.clearSelectedCardImageBlobUrl();

      this.cardImageInput.nativeElement.value = '';
    }
  }

  ngOnDestroy() {
    this.clearSelectedCardImageBlobUrl();
    this.variantValueChangeSubscription?.unsubscribe();
  }

  private updateSelectedCardImageBlobUrl() {
    this.clearSelectedCardImageBlobUrl();

    if(this.selectedCardImageFile) {
      this.selectedCardImageFileBlobUrl = URL.createObjectURL(this.selectedCardImageFile);
    }
  }

  private clearSelectedCardImageBlobUrl() {
    if(this.selectedCardImageFileBlobUrl) {
      URL.revokeObjectURL(this.selectedCardImageFileBlobUrl);
      this.selectedCardImageFileBlobUrl = undefined;
    }
  }

  private applyVariantSpecificValidators(variant: CardVariant) {
    const validatorMap: Record<string, ValidatorFn[]> = {
      'quote': [Validators.required, Validators.maxLength(200)],
      'level': [Validators.required, Validators.min(1), Validators.max(10)],
      'attack': [Validators.required, Validators.min(0), Validators.max(9999)],
      'health': [Validators.required, Validators.min(0), Validators.max(9999)],
      'typeId': [Validators.required, a => a.value === CARD_TYPE_NONE_ID ? { required: true } : null]
    };

    for(const key in validatorMap) {
      const control = this.cardForm.get(key);
      if(!control) continue;

      if(variant === 'REGULAR') {
        control.addValidators(validatorMap[key]);
      } else {
        control.clearValidators();
      }

      control.updateValueAndValidity();
    }
  }

  public closeModal() {
    this.onClose.emit();
  }

  public onCardImageChange(e: Event) {
    const input = e.target as HTMLInputElement;

    if(!input.files || input.files.length === 0) {
      return;
    }

    const [ file ] = input.files;

    this.selectedCardImageFile = file;
    this.updateSelectedCardImageBlobUrl();
  }

  public getCardTypeImageUrl(type: CardTypeDTO) {
    if(type.imageFileId) {
      return this.trackedFileService.getFileDownloadUrl(type.imageFileId);
    }

    return './assets/none-type.png';
  }

  public getNoneCardType() {
    return this.cardTypes().find(type => type.id === CARD_TYPE_NONE_ID)!;
  }

  public getNonEmptyCardTypes() {
    return this.cardTypes().filter(type => type.id !== CARD_TYPE_NONE_ID);
  }

  public getSelectedType() {
    const typeId = this.cardForm.get('typeId')?.value;
    const type = this.cardTypes().find(type => type.id === typeId);

    return type;
  }

  public onSubmit(e: SubmitEvent) {
    e.preventDefault();

    if(!this.cardForm.valid) {
      return;
    }

    const formData = this.cardForm.value;
    const card = this.card();

    if(card) {
      this.onEditSubmit.emit({
        cardToUpdate: card,
        dto: formData as CardUpdateDTO,
        imageFile: this.selectedCardImageFile
      });
    }
    else {
      this.onAddSubmit.emit({
        dto: formData as CardCreationDTO,
        imageFile: this.selectedCardImageFile
      });
    }
  }

  public getSelectedImageUrl() {
    if(this.selectedCardImageFileBlobUrl) {
      return this.selectedCardImageFileBlobUrl;
    }

    const card = this.card();

    if(card?.displayImageId) {
      return this.trackedFileService.getFileDownloadUrl(card.displayImageId);
    }

    return 'https://placehold.co/400';
  }

  public getCardPreviewProps(): CardPreviewProps {
    return {
      name: this.cardForm.get('name')?.value ?? '',
      number: this.cardForm.get('number')?.value ?? 1,
      variant: this.cardForm.get('variant')?.value ?? 'REGULAR',
      quote: this.cardForm.get('quote')?.value ?? undefined,
      effect: this.cardForm.get('effect')?.value ?? undefined,
      level: this.cardForm.get('level')?.value ?? undefined,
      attack: this.cardForm.get('attack')?.value ?? undefined,
      health: this.cardForm.get('health')?.value ?? 0,
      type: this.getSelectedType() ?? this.getNoneCardType(),
      imageUrl: this.getSelectedImageUrl()
    };
  }
}
