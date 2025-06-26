import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CardTypeCreationDTO, CardTypeDTO } from '../../../types/cardTypeDTO';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TrackedFileService } from '../../../services/tracked-file.service';
import { TypeEditPreviewComponent } from '../type-edit-preview/type-edit-preview.component';
import { AddTypeSubmission, EditTypeSubmission } from '../utilTypes';

@Component({
  selector: 'app-type-edit-modal',
  imports: [CommonModule, ReactiveFormsModule, TypeEditPreviewComponent],
  templateUrl: './type-edit-modal.component.html',
  styleUrl: './type-edit-modal.component.scss'
})
export class TypeEditModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input({
    required: true
  })
  public show!: boolean;

  @Input()
  public cardType?: CardTypeDTO;

  @Output()
  public onClose: EventEmitter<any> = new EventEmitter();

  @Output()
  public onAddType: EventEmitter<AddTypeSubmission> = new EventEmitter();

  @Output()
  public onEditType: EventEmitter<EditTypeSubmission> = new EventEmitter();

  public nameFormControl: FormControl = new FormControl('');

  public bgCol1FormControl: FormControl = new FormControl('');
  public bgCol2FormControl: FormControl = new FormControl('');
  public textColorFormControl: FormControl = new FormControl('');

  public selectedImageFile?: File;
  public selectedImageFileBlobUrl?: string;

  public constructor(private trackedFileService: TrackedFileService) {}

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['show'] && !changes['show'].isFirstChange()) {
      if(this.cardType) {
        this.nameFormControl.setValue(this.cardType.name);

        this.bgCol1FormControl.setValue(`#${this.cardType.backgroundColorHexCode1}`);
        this.bgCol2FormControl.setValue(`#${this.cardType.backgroundColorHexCode2}`);
        this.textColorFormControl.setValue(`#${this.cardType.textColor}`);
      }
      else {
        this.nameFormControl.setValue('');

        this.bgCol1FormControl.setValue(`#BBBBBB`);
        this.bgCol2FormControl.setValue(`#FFFFFF`);
        this.textColorFormControl.setValue(`#000000`);
      }

      this.selectedImageFile = undefined;
      this.clearSelectedImageBlobUrl();
    }
  }

  ngOnDestroy() {
    this.clearSelectedImageBlobUrl();
  }

  public handleClose() {
    this.onClose.emit();
  }

  private clearSelectedImageBlobUrl() {
    if(this.selectedImageFileBlobUrl) {
      URL.revokeObjectURL(this.selectedImageFileBlobUrl);
      this.selectedImageFileBlobUrl = undefined;
    }
  }

  private updateSelectedImageBlobUrl() {
    this.clearSelectedImageBlobUrl();

    if(this.selectedImageFile) {
      this.selectedImageFileBlobUrl = URL.createObjectURL(this.selectedImageFile);
    }
  }

  public getDisplayImageUrl() {
    if(this.selectedImageFileBlobUrl) {
      return this.selectedImageFileBlobUrl;
    }

    if(this.cardType?.imageFileId) {
      return this.trackedFileService.getFileDownloadUrl(this.cardType.imageFileId);
    }

    return 'https://placehold.co/400';
  }

  public async handleImageFileChange(e: Event) {
    const element = e.target as HTMLInputElement;

    if(!element.files || element.files.length === 0) {
      return;
    }

    const [ imageFile ] = element.files;

    this.selectedImageFile = imageFile;
    this.updateSelectedImageBlobUrl();
  }

  public handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = {
      backgroundColorHexCode1: this.bgCol1FormControl.value.slice(1),
      backgroundColorHexCode2: this.bgCol2FormControl.value.slice(1),
      textColor: this.textColorFormControl.value.slice(1),
      name: this.nameFormControl.value
    };

    if(this.cardType) {
      this.onEditType.emit({
        typeData: formData,
        imageFile: this.selectedImageFile
      });
    }
    else {
      this.onAddType.emit({
        typeData: formData,
        imageFile: this.selectedImageFile
      });
    }
  }
}
