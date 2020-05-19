import { SortDirection } from '@angular/material/sort';

export interface RequestParameterInterface
{
    sortBy?:string;
    sortOrder?:SortDirection;
    page?:number;
    itemsPerPage?:number;
    [key:string]:unknown;
}
