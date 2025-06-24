import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  public backendUrl = environment.backendBaseUrl;

  public getTypeBackgroundStyle() {
    return `background: radial-gradient(#${this.type.backgroundColorHexCode1}, #${this.type.backgroundColorHexCode2});`;
  }
}
