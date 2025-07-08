import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTypeDTO } from '../../../types/cardTypeDTO';
import { TrackedFileService } from '../../../services/tracked-file.service';

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

  public constructor(private trackedFileService: TrackedFileService) {}

  public getTypeBackgroundStyle() {
    return `background: radial-gradient(#${this.type.backgroundColorHexCode1}, #${this.type.backgroundColorHexCode2});`;
  }

  public getButtonStyle() {
    return `border: 1px solid #${this.type.textColor}; color: #${this.type.textColor};`;
  }

  public getImageUrl() {
    if(this.type.imageFileId) {
      return this.trackedFileService.getFileDownloadUrl(this.type.imageFileId);
    }

    return './assets/none-type.png';
  }

  public handleEditButtonClick() {
    this.editClick.emit();
  }
}
