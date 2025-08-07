import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PaginationDTO } from '../../types/paginationDTO';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination-display',
  imports: [CommonModule],
  templateUrl: './pagination-display.component.html',
  styleUrl: './pagination-display.component.scss'
})
export class PaginationDisplayComponent<T> {
  public readonly pageSizeOptions = [1, 5, 10, 25, 30, 50, 100];

  public paginationData = input.required<PaginationDTO<T>>();
  public dataLoading = input.required<boolean>();

  public onSetPageNum = output<number>();
  public onSetPageSize = output<number>();

  public getLastPage() {
    const { totalItemCount, pageSize } = this.paginationData();
    return Math.ceil(totalItemCount / pageSize);
  }

  public getCurrentPageNum() {
    const { pageNumber, totalItemCount } = this.paginationData();
    return totalItemCount === 0 ? 0 : pageNumber;
  }

  public handlePageSizeChange(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value) || this.pageSizeOptions[0];
    this.setPageSize(newSize);
  }

  public setPageNum(pageNum: number, absolute: boolean) {
    const newPageNum = absolute ? pageNum : this.paginationData().pageNumber + pageNum;
    const lastPage = this.getLastPage();

    if(newPageNum < 1 || newPageNum > lastPage) {
      console.warn(`Page number ${newPageNum} is outside of the range 1-${lastPage}`);
      return;
    }

    this.onSetPageNum.emit(newPageNum);
  }

  public setPageSize(newPageSize: number) {
    if(!this.pageSizeOptions.includes(newPageSize)) {
      console.warn(`Page size ${newPageSize} is not a valid option`);
      return;
    }

    this.onSetPageSize.emit(newPageSize);
  }
}
