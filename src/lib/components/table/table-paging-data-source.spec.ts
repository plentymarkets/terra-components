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
import { MockChangeDetectorRef } from '../../testing/mock-change-detector-ref';

const totalsCount:number = 2;
const entries:Array<{}> = [{},
                           {}];

class TestDataSource extends TablePagingDataSource<{}>
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

describe('TablePagingDataSource', () =>
{
    let dataSource:TestDataSource;
    let paginator:MatPaginator;

    beforeEach(() =>
    {
        dataSource = new TestDataSource();
        paginator = new MatPaginator(new MatPaginatorIntl(), new MockChangeDetectorRef());
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
});
