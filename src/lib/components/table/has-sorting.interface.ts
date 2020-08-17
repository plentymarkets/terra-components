import { MatSort, SortDirection } from '@angular/material/sort';

export interface HasSortingInterface {
    sort: MatSort;
    sortBy: string;
    sortDirection: SortDirection;
}
