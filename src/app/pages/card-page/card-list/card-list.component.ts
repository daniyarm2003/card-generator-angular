import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardDTO } from '../../../types/cardDTO';
import { CardDisplayComponent } from '../card-display/card-display.component';
import { PageLoadingIconComponent } from "../../../components/page-loading-icon/page-loading-icon.component";

@Component({
  selector: 'app-card-list',
  imports: [CommonModule, CardDisplayComponent, PageLoadingIconComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  public cardsLoading = input.required<boolean>();
  public cards = input.required<CardDTO[]>();

  public onEditCard = output<CardDTO>();

  public handleEditCard(card: CardDTO) {
    this.onEditCard.emit(card);
  }
}
