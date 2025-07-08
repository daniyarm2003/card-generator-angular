import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardDTO } from '../../../types/cardDTO';
import { TrackedFileService } from '../../../services/tracked-file.service';

@Component({
  selector: 'app-card-display',
  imports: [CommonModule],
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.scss'
})
export class CardDisplayComponent {
  public card = input.required<CardDTO>();

  public onEdit = output<CardDTO>();

  public constructor(private trackedFileService: TrackedFileService) {}

  public getCardImageUrl() {
    const { cardImageId } = this.card();
    return cardImageId ? this.trackedFileService.getFileDownloadUrl(cardImageId) : 'https://placehold.co/400';
  }

  public getCardStyle() {
    const { backgroundColorHexCode1, backgroundColorHexCode2, textColor } = this.card().type;

    return {
      'background': `radial-gradient(#${backgroundColorHexCode1}, #${backgroundColorHexCode2})`,
      'color': `#${textColor}`
    };
  }

  public handleEditClick() {
    this.onEdit.emit(this.card());
  }

  public getButtonStyle() {
    const { textColor } = this.card().type;

    return {
      'border': `1px solid #${textColor}`,
      'color': `#${textColor}`
    };
  }
}
