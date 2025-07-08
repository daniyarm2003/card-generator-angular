import { Component, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from "../../layouts/default-layout/default-layout.component";
import { PageLoadingIconComponent } from "../../components/page-loading-icon/page-loading-icon.component";
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { CardDTO } from '../../types/cardDTO';
import { PaginationDTO } from '../../types/paginationDTO';
import { PaginationDisplayComponent } from "../../components/pagination-display/pagination-display.component";
import { CardListComponent } from "./card-list/card-list.component";
import { CardEditModalComponent } from './card-edit-modal/card-edit-modal.component';
import { CardTypeService } from '../../services/card-type.service';
import { CardTypeDTO } from '../../types/cardTypeDTO';

@Component({
  selector: 'app-card-page',
  imports: [DefaultLayoutComponent, PageLoadingIconComponent, PageLoadingIconComponent, CommonModule, PaginationDisplayComponent, 
    PaginationDisplayComponent, CardListComponent, CardEditModalComponent],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss'
})
export class CardPageComponent implements OnInit {
  public cardsLoading = true;
  public cardTypesLoading = true;

  public cards?: PaginationDTO<CardDTO>;
  public cardTypes: CardTypeDTO[] = [];

  public cardPageNum = 1;
  public cardPageSize = 50;

  public showCardModal = false;
  public cardToEdit?: CardDTO;

  constructor(private cardService: CardService, private cardTypeService: CardTypeService) { }

  ngOnInit() {
    this.refreshCards();

    this.cardTypesLoading = true;
    this.cardTypeService.getAllCardTypes().subscribe({
      next: (data) => {
        this.cardTypes = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.cardTypesLoading = false;
      }
    });
  }

  private refreshCards() {
    this.cardsLoading = true;

    this.cardService.getCardsPaginated(this.cardPageNum, this.cardPageSize).subscribe({
      next: (data) => {
        this.cards = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.cardsLoading = false;
      }
    });
  }

  public openCardModal(card?: CardDTO) {
    this.showCardModal = true;
    this.cardToEdit = card;
  }

  public closeCardModal() {
    this.showCardModal = false;
    this.cardToEdit = undefined;
  }

  public onPaginationPropsChange(pageNum: number, pageSize: number) {
    this.cardsLoading = true;

    this.cardPageNum = pageNum;
    this.cardPageSize = pageSize;

    this.refreshCards();
  }
}
