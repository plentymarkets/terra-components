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

interface FilterParams
{
    id:number;
}

fdescribe('TablePagingDataSource', () =>
{
    let dataSource:TablePagingDataSource<unknown>;
    let filter:TerraFilter<FilterParams>;
    let paginator:MatPaginator;

    beforeEach(() =>
    {
        dataSource = new Test();
        filter = new TerraFilter<FilterParams>();
        paginator = new MatPaginator(new MatPaginatorIntl(), undefined);

        dataSource.filter = filter;
        dataSource.paginator = paginator;
    });

    it('should create', function()
    {
        expect(dataSource).toBeTruthy();
    });

    it('should have a paginator instance', function()
    {
        expect(dataSource.paginator).toBe(paginator);
    });

    it('should give pageIndex', function()
    {
        expect(dataSource.pageIndex).toBe(1);
    });

    it('should give itemsPerPage', function()
    {
        dataSource.paginator.pageSize = 10;
        expect(dataSource.itemsPerPage).toBe(10);
    });
});
