import { CommonModule } from '@angular/common';
import { Component, effect, input, OnChanges, OnInit, output } from '@angular/core';
import { CardDTO, CardVariant } from '../../../types/cardDTO';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-edit-modal',
  imports: [CommonModule],
  templateUrl: './card-edit-modal.component.html',
  styleUrl: './card-edit-modal.component.scss'
})
export class CardEditModalComponent implements OnInit, OnChanges {
  public show = input.required<boolean>();
  public card = input<CardDTO>();

  public onClose = output<void>();

  public cardForm = new FormGroup({
    name: new FormControl('', Validators.required),
    variant: new FormControl<CardVariant>('REGULAR', Validators.required),
    quote: new FormControl(''),
    effect: new FormControl(''),
    level: new FormControl<number>(1),
    attack: new FormControl<number>(0),
    health: new FormControl<number>(0)
  });

  ngOnInit() {
    const variantControl = this.cardForm.get('variant');

    if(variantControl) {
      this.applyVariantSpecificValidators(variantControl.value ?? 'NEBULA');
      variantControl.valueChanges.subscribe(variant => this.applyVariantSpecificValidators(variant ?? 'NEBULA'));
    }
  }

  ngOnChanges() {
    
  }

  private applyVariantSpecificValidators(variant: CardVariant) {
    const validatorMap: Record<string, ValidatorFn[]> = {
      'quote': [Validators.required],
      'level': [Validators.required, Validators.min(1), Validators.max(10)],
      'attack': [Validators.required, Validators.min(0), Validators.max(9999)],
      'health': [Validators.required, Validators.min(0), Validators.max(9999)]
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
}
