import { TableDataSource } from './table-data-source';
import {
    EMPTY,
    Observable
} from 'rxjs';
import {
    MatPaginator,
    PageEvent
} from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';

export abstract class TablePagingDataSource<T> extends TableDataSource<T>
{
    public paginator:MatPaginator;

    protected paging():Observable<never> | EventEmitter<PageEvent>
    {
        return this.paginator ? this.paginator.page : EMPTY;
    }

    public get pageIndex():number
    {
        return this.paginator ? this.paginator.pageIndex + 1 : undefined;
    }

    public get itemsPerPage():number
    {
        return this.paginator ? this.paginator.pageSize : undefined;
    }
}
