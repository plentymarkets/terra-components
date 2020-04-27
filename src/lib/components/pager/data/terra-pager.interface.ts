export interface TerraPagerInterface<T> {
  page: number;
  totalsCount: number;
  isLastPage: boolean;
  lastPageNumber: number;
  firstOnPage: number;
  lastOnPage: number;
  itemsPerPage: number;
  pagingUnit?: string; // Label for pager items
  entries?: Array<T>;
}
