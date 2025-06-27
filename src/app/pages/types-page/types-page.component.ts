import { Component, OnInit } from '@angular/core';
import { CardTypeService } from '../../services/card-type.service';
import { CardTypeCreationDTO, CardTypeDTO } from '../../types/cardTypeDTO';
import { CommonModule } from '@angular/common';
import { TypeDisplayComponent } from './type-display/type-display.component';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';
import { TypeEditModalComponent } from './type-edit-modal/type-edit-modal.component';
import { AddTypeSubmission } from './utilTypes';
import { catchError, concat, concatMap, finalize, iif, mergeMap, of, throwError } from 'rxjs';

@Component({
  selector: 'app-types-page',
  imports: [CommonModule, TypeDisplayComponent, DefaultLayoutComponent, TypeEditModalComponent],
  templateUrl: './types-page.component.html',
  styleUrl: './types-page.component.scss'
})
export class TypesPageComponent implements OnInit {

  public cardTypesLoading: boolean = true;
  public cardTypes: CardTypeDTO[] = [];

  public curEditingCardType?: CardTypeDTO = undefined;
  public showEditModal: boolean = false;

  public constructor(private cardTypeService: CardTypeService) { }

  ngOnInit() {
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

  public handleCreateTypeClick() {
    this.curEditingCardType = undefined;
    this.showEditModal = true;
  }

  public handleTypeEditClick(cardType: CardTypeDTO) {
    this.curEditingCardType = cardType;
    this.showEditModal = true;
  }

  public handleModalClose() {
    this.showEditModal = false;
  }

  public onAddType({ typeData, imageFile }: AddTypeSubmission) {
    const typeCreation$ = this.cardTypeService.createCardType(typeData);

    typeCreation$.pipe(
      catchError((err) => {
        window.alert('An error has occurred while trying to create a new type');
        return throwError(() => err);
      }),
      concatMap((createdType) => {
        if(!imageFile) {
          return of(createdType);
        }

        return this.cardTypeService.updateCardTypeImage(createdType.id, imageFile);
      }),
      finalize(() => this.showEditModal = false)
    ).subscribe({
      next: (createdType) => {
        this.cardTypes.push(createdType);
      },
      error: (err) => console.error(err)
    });
  }
}
