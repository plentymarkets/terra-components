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
import { TerraFilter } from './filter';

class Test extends TablePagingDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<Array<{}>>
    {
        return of(new Array({}));
    }
}

fdescribe('TablePagingDataSource', () =>
{
    let dataSource:TablePagingDataSource<unknown>;
    let paginator:MatPaginator;

    beforeEach(() =>
    {
        dataSource = new Test();
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
