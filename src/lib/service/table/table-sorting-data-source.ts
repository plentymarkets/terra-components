import { TableDataSource } from './table-data-source';
import {
    MatSort,
    Sort,
    SortDirection
} from '@angular/material/sort';
import { EventEmitter } from '@angular/core';
import {
    EMPTY,
    Observable
} from 'rxjs';

export class TableSortingDataSource<T> extends TableDataSource<T>
{
    public sort:MatSort;

    protected sorting():Observable<never> | EventEmitter<Sort>
    {
        return this.sort ? this.sort.sortChange : EMPTY;
    }

    public get sortBy():string
    {
        return this.sort ? this.sort.active : '';
    }

    public get sortDirection():SortDirection
    {
        return this.sort ? this.sort.direction : '';
    }
}
