import { Component, input } from '@angular/core';
import { CardPreviewProps, NEBULA_BACKGROUND_COLOR_INNER, NEBULA_BACKGROUND_COLOR_OUTER, NEBULA_TEXT_COLOR } from '../utils';
import { TrackedFileService } from '../../../services/tracked-file.service';
import { CommonModule } from '@angular/common';
import { CARD_TYPE_NONE_ID } from '../../../types/cardTypeDTO';

@Component({
  selector: 'app-card-preview',
  imports: [CommonModule],
  templateUrl: './card-preview.component.html',
  styleUrl: './card-preview.component.scss'
})
export class CardPreviewComponent {
  public previewProps = input.required<CardPreviewProps>();

  public constructor(private trackedFileService: TrackedFileService) {}

  public getTypeImageUrl() {
    const type = this.previewProps().type;
    return type.imageFileId ? this.trackedFileService.getFileDownloadUrl(type.imageFileId) : './assets/none-type.png';
  }

  public getTextColor() {
    return `#${this.previewProps().type.textColor}`;
  }

  public getStyle() {
    const { backgroundColorHexCode1, backgroundColorHexCode2 } = this.previewProps().type;

    if (this.previewProps().variant === 'NEBULA') {
      return {
        'color': NEBULA_TEXT_COLOR,
        'background': `radial-gradient(${NEBULA_BACKGROUND_COLOR_INNER}, ${NEBULA_BACKGROUND_COLOR_OUTER})`
      };
    }

    return {
      'color': this.getTextColor(),
      'background': `radial-gradient(#${backgroundColorHexCode1}, #${backgroundColorHexCode2})`,
    };
  }

  public getImageStyle() {
    return {
      'background-image': `url(${this.previewProps().imageUrl})`,
      'background-size': '100% 100%',
      'border': `1px solid ${this.getTextColor()}`,
      'border-radius': '5px',
      'background-repeat': 'no-repeat'
    };
  }

  public getEffectBoxStyle() {
    if(!this.previewProps().effect) {
      return {};
    }

    return {
      'border': `1px solid ${this.getTextColor()}`,
      'color': this.getTextColor()
    };
  }

  public isTypeSelected() {
    return this.previewProps().type.id !== CARD_TYPE_NONE_ID;
  }
}
