import { SortDirection } from '@angular/material/sort';

/**
 *
 * @experimental
 */
export interface RequestParameterInterface
{
    sortBy?:string;
    sortOrder?:SortDirection;
    page?:number;
    itemsPerPage?:number;
    [key:string]:unknown;
}
