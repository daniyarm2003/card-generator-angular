import { Component, OnInit } from '@angular/core';
import { CardTypeService } from '../../services/card-type.service';
import { CardTypeDTO } from '../../types/cardTypeDTO';
import { CommonModule } from '@angular/common';
import { TypeDisplayComponent } from './type-display/type-display.component';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';
import { TypeEditModalComponent } from './type-edit-modal/type-edit-modal.component';
import { AddTypeSubmission, EditTypeSubmission } from './utilTypes';
import { catchError, concatMap, finalize, of, throwError } from 'rxjs';
import { PageLoadingIconComponent } from '../../components/page-loading-icon/page-loading-icon.component';

@Component({
  selector: 'app-types-page',
  imports: [CommonModule, TypeDisplayComponent, DefaultLayoutComponent, TypeEditModalComponent, PageLoadingIconComponent],
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
      catchError((err, caught) => {
        window.alert('An error has occurred while trying to create an image for the type');
        console.error(err);

        return caught;
      }),
      finalize(() => this.showEditModal = false)
    ).subscribe({
      next: (createdType) => {
        this.cardTypes.push(createdType);
      },
      error: (err) => console.error(err)
    });
  }

  public onEditType({ editingType, typeData, imageFile }: EditTypeSubmission) {
    const typeUpdate$ = this.cardTypeService.updateCardType(editingType.id, typeData);

    typeUpdate$.pipe(
      catchError((err) => {
        window.alert('An error has occurred while trying to update the type');
        return throwError(() => err);
      }),
      concatMap((updatedType) => {
        if(!imageFile) {
          return of(updatedType);
        }

        return this.cardTypeService.updateCardTypeImage(updatedType.id, imageFile);
      }),
      catchError((err, caught) => {
        window.alert('An error has occurred while trying to update the image for the type');
        console.error(err);

        return caught;
      }),
      finalize(() => this.showEditModal = false)
    ).subscribe({
      next: (updatedType) => {
        this.cardTypes = this.cardTypes.map((type) => type.id === updatedType.id ? updatedType : type)
      },
      error: (err) => console.error(err)
    });
  }
}
