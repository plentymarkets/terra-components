import { MatPaginator } from '@angular/material/paginator';

export interface HasPaginatorInterface {
    paginator: MatPaginator;
    pageIndex: number;
    itemsPerPage: number;
}
