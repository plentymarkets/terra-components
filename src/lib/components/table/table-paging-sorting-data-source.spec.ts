import { RequestParameterInterface } from './request-parameter.interface';
import {
    noop,
    Observable,
    of
} from 'rxjs';
import {
    MatPaginator,
    MatPaginatorIntl
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TablePagingSortingDataSource } from './table-paging-sorting-data-source';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';
import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from '../../testing/mock-change-detector-ref';

const totalsCount:number = 2;
const entries:Array<{}> = [{},
                           {}];
/* tslint:disable */
class TestDataSource extends TablePagingSortingDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<TerraPagerInterface<{}>>
    {
        return of({
            page:           1,
            totalsCount:    totalsCount,
            isLastPage:     true,
            lastPageNumber: 1,
            firstOnPage:    1,
            lastOnPage:     2,
            itemsPerPage:   2,
            entries:        entries
        });
    }
}

describe('TablePagingSortingDataSource', () =>
{
    let dataSource:TestDataSource;
    let paginator:MatPaginator;
    let sort:MatSort;

    beforeEach(() =>
    {
        dataSource = new TestDataSource();
        paginator = new MatPaginator(new MatPaginatorIntl(), new MockChangeDetectorRef());
        sort = new MatSort();
        dataSource.paginator = paginator;
        dataSource.sort = sort;
    });

    it('should create', () =>
    {
        expect(dataSource).toBeTruthy();
    });

    it('should have a paginator and sort instance', () =>
    {
        expect(dataSource.paginator).toBe(paginator);
        expect(dataSource.sort).toBe(sort);
    });

    it('should give pageIndex', () =>
    {
        expect(dataSource.pageIndex).toBe(1);
    });

    it('should give itemsPerPage', () =>
    {
        dataSource.paginator.pageSize = 10;
        expect(dataSource.itemsPerPage).toBe(10);
    });

    it('should set active sorting by param', () =>
    {
        expect(dataSource.sortBy).toBeFalsy();
        dataSource.sort.active = 'id';
        expect(dataSource.sortBy).toBe('id');
    });

    it('should set sorting direction', () =>
    {
        expect(dataSource.sortDirection).toBe('');
        dataSource.sort.direction = 'desc';
        expect(dataSource.sortDirection).toBe('desc');
    });

    it('should pass on correct parameters to the request', () =>
    {
        paginator.pageIndex = 2;
        paginator.pageSize = 20;

        spyOn(dataSource, 'request').and.callThrough();

        dataSource.connect(undefined).subscribe();
        dataSource.search();

        expect(dataSource.request).toHaveBeenCalledWith({
            page:         dataSource.pageIndex,
            itemsPerPage: dataSource.itemsPerPage
        });
    });

    it('should get correct array of entries', () =>
    {
        spyOn(dataSource, 'request').and.callThrough();

        dataSource.connect(undefined).subscribe();
        dataSource.search();

        expect(dataSource.data).toEqual(entries);
        expect(paginator.length).toBe(totalsCount);
    });

    it('should pass on correct parameters to the request', () =>
    {
        sort.active = 'id';
        sort.direction = 'desc';

        spyOn(dataSource, 'request').and.callThrough();

        dataSource.connect(undefined).subscribe();
        dataSource.search();

        expect(dataSource.request).toHaveBeenCalledWith({
            sortBy:    dataSource.sortBy,
            sortOrder: dataSource.sortDirection
        });
    });
});
