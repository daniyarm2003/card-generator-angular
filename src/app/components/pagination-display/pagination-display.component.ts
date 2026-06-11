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
  private readonly visiblePageCount = 5;

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

  public getFirstDisplayedPageNum() {
    const curPage = this.getCurrentPageNum();
    const lastPage = this.getLastPage();

    const leftBound = Math.max(curPage - Math.floor(this.visiblePageCount / 2), 1);
    const rightBound = Math.min(curPage + Math.floor(this.visiblePageCount / 2), lastPage);

    const numVisiblePages = rightBound - leftBound + 1;
    const boundaryShift = this.visiblePageCount - numVisiblePages;

    return Math.max(leftBound - boundaryShift, 1);
  }

  public getLastDisplayedPageNum() {
    const curPage = this.getCurrentPageNum();
    const lastPage = this.getLastPage();

    const leftBound = Math.max(curPage - Math.floor(this.visiblePageCount / 2), 1);
    const rightBound = Math.min(curPage + Math.floor(this.visiblePageCount / 2), lastPage);

    const numVisiblePages = rightBound - leftBound + 1;
    const boundaryShift = this.visiblePageCount - numVisiblePages;

    return Math.min(rightBound + boundaryShift, lastPage);
  }

  public getDisplayedPageRange() {
    const range = [];

    for(let i = this.getFirstDisplayedPageNum(); i <= this.getLastDisplayedPageNum(); i++) {
      range.push(i);
    }

    return range;
  }

  public getPageItemClass(pageNum: number) {
    return pageNum === this.getCurrentPageNum() ? 'page-item active' : 'page-item';
  }

  public getPreviousPageButtonClass() {
    return this.getCurrentPageNum() > 1 ? 'page-item' : 'page-item disabled';
  }

  public getNextPageButtonClass() {
    return this.getCurrentPageNum() < this.getLastPage() ? 'page-item' : 'page-item disabled';
  }

  public shouldDisplayFirstPageOption() {
    const curPage = this.getCurrentPageNum();
    const leftBound = Math.max(curPage - Math.floor(this.visiblePageCount / 2), 1);

    return leftBound > 1;
  }

  public shouldDisplayEllipses(firstPage: boolean) {
    const curPage = this.getCurrentPageNum();
    const lastPage = this.getLastPage();

    const leftBound = Math.max(curPage - Math.floor(this.visiblePageCount / 2), 1);
    const rightBound = Math.min(curPage + Math.floor(this.visiblePageCount / 2), lastPage);

    return firstPage ? leftBound > 2 : rightBound < lastPage - 1;
  }

  public shouldDisplayLastPageOption() {
    const curPage = this.getCurrentPageNum();
    const lastPage = this.getLastPage();
    const rightBound = Math.min(curPage + Math.floor(this.visiblePageCount / 2), lastPage);

    return rightBound < lastPage;
  }

  public setPageNum(pageNum: number, absolute: boolean) {
    const newPageNum = absolute ? pageNum : this.paginationData().pageNumber + pageNum;
    const lastPage = this.getLastPage();

    if(newPageNum === this.getCurrentPageNum()) {
      return;
    }

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
