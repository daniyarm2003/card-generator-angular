import { Component, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from "../../layouts/default-layout/default-layout.component";
import { PageLoadingIconComponent } from "../../components/page-loading-icon/page-loading-icon.component";
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';
import { CardDTO, CardQueryDTO } from '../../types/cardDTO';
import { PaginationDTO } from '../../types/paginationDTO';
import { PaginationDisplayComponent } from "../../components/pagination-display/pagination-display.component";
import { CardListComponent } from "./card-list/card-list.component";
import { CardEditModalComponent } from './card-edit-modal/card-edit-modal.component';
import { CardTypeService } from '../../services/card-type.service';
import { CardTypeDTO } from '../../types/cardTypeDTO';
import { AddCardSubmission, CardUpdateSubmission } from './utils';
import { catchError, concatMap, finalize, of, throwError } from 'rxjs';
import { S3HelperService } from '../../services/s3-helper.service';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-card-page',
  imports: [DefaultLayoutComponent, PageLoadingIconComponent, PageLoadingIconComponent, CommonModule, PaginationDisplayComponent,
    PaginationDisplayComponent, CardListComponent, CardEditModalComponent, SearchBarComponent],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.scss'
})
export class CardPageComponent implements OnInit {
  public cardsLoading = true;
  public cardTypesLoading = true;

  public cards?: PaginationDTO<CardDTO>;
  public cardTypes: CardTypeDTO[] = [];

  public searchFilters: CardQueryDTO = {
    pageNum: 1,
    pageSize: 30
  };

  public showCardModal = false;
  public cardToEdit?: CardDTO;

  public cardModalSubmitLoading = false;

  constructor(private cardService: CardService, private cardTypeService: CardTypeService, private s3HelperService: S3HelperService) { }

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

    this.cardService.getCards(this.searchFilters).subscribe({
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

  public onDeleteCard(card: CardDTO) {
    if(window.confirm(`Are you sure you would like to delete ${card.name}?`)) {
      this.onDeleteCardSubmit(card);
    }
  }

  public onPaginationPropsChange(pageNum: number, pageSize: number) {
    this.cardsLoading = true;

    this.searchFilters.pageNum = pageNum;
    this.searchFilters.pageSize = pageSize;

    this.refreshCards();
  }

  public onSearchQueryChangeBegin() {
    this.cardsLoading = true;
  }

  public onSearchQueryChange(searchQuery: string | null) {
    if(searchQuery !== null) {
      this.searchFilters.searchQuery = searchQuery ?? undefined;
    }
    else {
      delete this.searchFilters.searchQuery;
    }

    this.refreshCards();
  }

  private getDisplayImageUploadObservable(card: CardDTO, imageFile: File) {
    return this.cardService.createCardDisplayImageUploadUrl(card.id, imageFile.name).pipe(
      concatMap(uploadUrlRes => this.s3HelperService.putToPresignedUrl(uploadUrlRes.uploadURL, imageFile, uploadUrlRes.contentType).pipe(
        concatMap(() => of(card)),
        catchError(err => {
          window.alert('An error has occurred while trying to upload the display image for the card');
          console.error(err);

          return of(card);
        })
      )),
      catchError(err => {
        window.alert('An error has occurred while trying to create a display image for the card');
        console.error(err);

        return of(card);
      })
    );
  }

  private getCardImageUpdateObservable(card: CardDTO) {
    return this.cardService.generateCardImage(card.id).pipe(
      catchError(err => {
        window.alert('An error has occurred while trying to generate the card image');
        console.error(err);

        return of(card);
      })
    );
  }

  public onAddCardSubmit(submission: AddCardSubmission) {
    this.cardModalSubmitLoading = true;
    
    this.cardService.createCard(submission.dto).pipe(
      catchError(err => {
        window.alert('An error occurred while creating the card');
        return throwError(() => err);
      }),
      concatMap(card => {
        if(!submission.imageFile) {
          return of(card);
        }

        return this.getDisplayImageUploadObservable(card, submission.imageFile);
      }),
      concatMap(card => this.getCardImageUpdateObservable(card)),
      finalize(() => {
        this.cardModalSubmitLoading = false;
        this.showCardModal = false;
      })
    ).subscribe({
      next: () => {
        this.refreshCards();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public onEditCardSubmit(submission: CardUpdateSubmission) {
    this.cardModalSubmitLoading = true;
    
    this.cardService.updateCard(submission.cardToUpdate.id, submission.dto).pipe(
      catchError(err => {
        window.alert('An error occurred while updating the card');
        return throwError(() => err);
      }),
      concatMap(card => {
        if(!submission.imageFile) {
          return of(card);
        }

        return this.getDisplayImageUploadObservable(card, submission.imageFile);
      }),
      concatMap(card => this.getCardImageUpdateObservable(card)),
      finalize(() => {
        this.cardModalSubmitLoading = false;
        this.showCardModal = false;
      })
    ).subscribe({
      next: (updatedCard) => {
        if(!this.cards) {
          console.error('Cards data is not loaded');
          return;
        }

        this.cards.data = this.cards.data.map(card => card.id === updatedCard.id ? updatedCard : card);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public onDeleteCardSubmit(card: CardDTO) {
    this.cardService.deleteCard(card.id).subscribe({
      next: () => {
        this.refreshCards();
      },
      error: (err) => {
        window.alert('An error occurred while deleting the card');
        console.error(err);
      }
    })
  }
}
