import { SortDirection } from '@angular/material/sort';

/**
 * Interface for request parameter. Attributes for sorting and paging are optional.
 * @experimental
 */
export interface RequestParameterInterface {
    sortBy?: string;
    sortOrder?: SortDirection;
    page?: number;
    itemsPerPage?: number;
    [key: string]: unknown;
}
