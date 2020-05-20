import { RequestParameterInterface } from './request-parameter.interface';
import {
    Observable,
    of
} from 'rxjs';
import {
    MatPaginator,
    MatPaginatorIntl
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TablePagingSortingDataSource } from './table-paging-sorting-data-source';

class TestDataSource extends TablePagingSortingDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<Array<{}>>
    {
        return of(new Array({}));
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
        paginator = new MatPaginator(new MatPaginatorIntl(), undefined);
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
});
