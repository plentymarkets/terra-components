import { TablePagingDataSource } from './table-paging-data-source';
import { RequestParameterInterface } from './request-parameter.interface';
import {
    Observable,
    of
} from 'rxjs';
import {
    MatPaginator,
    MatPaginatorIntl
} from '@angular/material/paginator';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

class TestDataSource extends TablePagingDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<TerraPagerInterface<{}>>
    {
        return of({
            page: 1,
            totalsCount: 10,
            isLastPage: true,
            lastPageNumber: 1,
            firstOnPage: 1,
            lastOnPage: 10,
            itemsPerPage: 10,
            entries: [...]
        });
    }
}

describe('TablePagingDataSource', () =>
{
    let dataSource:TestDataSource;
    let paginator:MatPaginator;

    beforeEach(() =>
    {
        dataSource = new TestDataSource();
        paginator = new MatPaginator(new MatPaginatorIntl(), undefined);
        dataSource.paginator = paginator;
    });

    it('should create', () =>
    {
        expect(dataSource).toBeTruthy();
    });

    it('should have a paginator instance', () =>
    {
        expect(dataSource.paginator).toBe(paginator);
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
});
