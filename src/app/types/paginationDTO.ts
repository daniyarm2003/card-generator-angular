export interface PaginationDTO<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalItemCount: number;
}