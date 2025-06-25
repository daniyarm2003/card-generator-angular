import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CardTypeDTO } from '../../../types/cardTypeDTO';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-edit-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './type-edit-modal.component.html',
  styleUrl: './type-edit-modal.component.scss'
})
export class TypeEditModalComponent implements OnInit, OnChanges {
  @Input({
    required: true
  })
  public show!: boolean;

  @Input()
  public cardType?: CardTypeDTO;

  @Output()
  public onClose: EventEmitter<any> = new EventEmitter();

  public nameFormControl: FormControl = new FormControl('');

  public bgCol1FormControl: FormControl = new FormControl('');
  public bgCol2FormControl: FormControl = new FormControl('');
  public textColorFormControl: FormControl = new FormControl('');

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['show'] && !changes['show'].isFirstChange()) {
      console.log(this.cardType);

      if(this.cardType) {
        this.nameFormControl.setValue(this.cardType.name);

        this.bgCol1FormControl.setValue(`#${this.cardType.backgroundColorHexCode1}`);
        this.bgCol2FormControl.setValue(`#${this.cardType.backgroundColorHexCode2}`);
        this.textColorFormControl.setValue(`#${this.cardType.textColor}`);
      }
    }
  }

  public handleClose() {
    this.onClose.emit();
  }
}
