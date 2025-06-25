import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTypeDTO } from '../../../types/cardTypeDTO';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-type-display',
  imports: [CommonModule],
  templateUrl: './type-display.component.html',
  styleUrl: './type-display.component.scss'
})
export class TypeDisplayComponent {
  @Input({
    required: true
  })
  public type!: CardTypeDTO;

  @Output()
  public editClick: EventEmitter<any> = new EventEmitter();

  public backendUrl = environment.backendBaseUrl;

  public getTypeBackgroundStyle() {
    return `background: radial-gradient(#${this.type.backgroundColorHexCode1}, #${this.type.backgroundColorHexCode2});`;
  }

  public getButtonStyle() {
    return `border: 1px solid #${this.type.textColor}; color: #${this.type.textColor};`;
  }

  public handleEditButtonClick() {
    this.editClick.emit();
  }
}
