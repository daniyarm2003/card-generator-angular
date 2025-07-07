import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PaginationDTO } from '../../types/paginationDTO';

@Component({
  selector: 'app-pagination-display',
  imports: [CommonModule],
  templateUrl: './pagination-display.component.html',
  styleUrl: './pagination-display.component.scss'
})
export class PaginationDisplayComponent<T> {
  public paginationData = input.required<PaginationDTO<T>>();
  public dataLoading = input.required<boolean>();

  public onSetPageNum = output<number>();
  public onSetPageSize = output<number>();

  public getLastPage() {
    const { totalItemCount, pageSize } = this.paginationData();
    return Math.ceil(totalItemCount / pageSize);
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
}
