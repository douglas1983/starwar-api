export class ResponsePagination {
  totalItems: number;
  results: object[];
  currentPage: number;
  pageSize: number;
  totalPages: number;

  constructor(
    totalItems: number,
    results: object[],
    currentPage: number,
    pageSize: number,
  ) {
    this.totalItems = totalItems;
    this.results = results;
    this.currentPage = Number(currentPage);
    this.pageSize = Number(pageSize);
    this.totalPages = Math.ceil(totalItems / pageSize);
  }
}
