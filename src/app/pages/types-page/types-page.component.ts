import { Component, OnInit } from '@angular/core';
import { CardTypeService } from '../../services/card-type.service';
import { CardTypeDTO } from '../../types/cardTypeDTO';
import { CommonModule } from '@angular/common';
import { TypeDisplayComponent } from './type-display/type-display.component';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';
import { TypeEditModalComponent } from './type-edit-modal/type-edit-modal.component';

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

  public handleTypeEditClick(cardType: CardTypeDTO) {
    this.curEditingCardType = cardType;
    this.showEditModal = true;
  }

  public handleModalClose() {
    this.showEditModal = false;
  }
}
