import { TerraTableDataSource } from './terra-table-data-source';
import { RequestParameterInterface } from './request-parameter.interface';
import { Observable, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { TerraFilter } from './filter';
import { MatSort } from '@angular/material/sort';
import { fakeAsync, tick } from '@angular/core/testing';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

class ConcreteTableDataSource extends TerraTableDataSource<{}> {
    public request(requestParams: RequestParameterInterface): Observable<Array<{}> | TerraPagerInterface<{}>> {
        return of([{}]);
    }
}

// tslint:disable:max-function-line-count
describe('TerraTableDataSource', () => {
    let dataSource: ConcreteTableDataSource;

    beforeEach(() => (dataSource = new ConcreteTableDataSource()));

    it('should create', () => {
        expect(dataSource).toBeTruthy();
    });

    it('should notify the table if data has been updated manually', () => {
        let data: Array<any> = dataSource.data;
        expect(data).toEqual([]);
        dataSource.connect().subscribe((d: Array<any>) => (data = d));
        const newData: Array<any> = [{ foo: 'bar' }];
        dataSource.data = newData;

        expect(dataSource.data).toEqual(newData);
        expect(data).toEqual(newData);
    });

    it('should start a request if search is called', () => {
        spyOn(dataSource, 'request').and.callThrough();

        dataSource.search();

        expect(dataSource.request).toHaveBeenCalledWith({});
        expect(dataSource.data).toEqual([{}]);
    });

    it('should be able to assign a filter', () => {
        const filter: TerraFilter<any> = new TerraFilter();
        dataSource.filter = filter;
        expect(dataSource.filter).toBe(filter);
    });

    it('should start a request if a search is triggered via the filter', () => {
        spyOn(dataSource, 'request').and.callThrough();

        const filter: TerraFilter<any> = new TerraFilter();
        dataSource.filter = filter;
        filter.search();

        expect(dataSource.request).toHaveBeenCalled();
    });

    it('should pass filter parameters to the request', () => {
        spyOn(dataSource, 'request').and.callThrough();

        const filter: TerraFilter<any> = new TerraFilter();
        dataSource.filter = filter;
        filter.filterParameter = { id: 123, foo: 'bar' };

        filter.search();

        expect(dataSource.request).toHaveBeenCalledWith(filter.filterParameter);
    });

    it('should be able to assign a MatSort instance', () => {
        const sort: MatSort = {
            active: 'foo',
            direction: 'desc',
            sortChange: new EventEmitter()
        } as MatSort;
        dataSource.sort = sort;
        expect(dataSource.sort).toBe(sort);
    });

    it('should start a request if MatSort is given, data is present and a sort event occurs', fakeAsync(() => {
        spyOn(dataSource, 'request').and.callThrough();
        dataSource.data = [{}];
        const sort: MatSort = {
            active: 'foo',
            direction: 'desc',
            sortChange: new EventEmitter()
        } as MatSort;
        dataSource.sort = sort;

        expect(dataSource.data.length).toBeGreaterThan(0);

        sort.sortChange.emit();

        // due to debounceTime operator
        tick(500);

        expect(dataSource.request).toHaveBeenCalledWith({ sortBy: sort.active, sortOrder: sort.direction });
    }));

    it('should be able to assign a paginator instance', () => {
        const paginator: MatPaginator = {
            pageIndex: 1,
            pageSize: 25,
            page: new EventEmitter()
        } as MatPaginator;
        dataSource.paginator = paginator;
        expect(dataSource.paginator).toBe(paginator);
    });

    it('should start a request if a paginator is available, data is present and the page or pageSize has changed', fakeAsync(() => {
        spyOn(dataSource, 'request').and.callThrough();

        dataSource.data = [{}];
        const paginator: Partial<MatPaginator> = {
            pageIndex: 1,
            pageSize: 25,
            page: new EventEmitter()
        };
        dataSource.paginator = paginator as MatPaginator;

        paginator.page.emit();

        // due to debounceTime operator
        tick(500);

        expect(dataSource.request).toHaveBeenCalledWith({
            page: paginator.pageIndex + 1,
            itemsPerPage: paginator.pageSize
        });
    }));

    it('should return entries of a paginated response', () => {
        const paginatedResult: TerraPagerInterface<any> = {
            page: 1,
            totalsCount: 2,
            firstOnPage: 1,
            lastOnPage: 2,
            lastPageNumber: 1,
            isLastPage: true,
            itemsPerPage: 25,
            entries: [{}, {}]
        };
        spyOn(dataSource, 'request').and.returnValue(of(paginatedResult));

        dataSource.search();

        expect(dataSource.data).toBe(paginatedResult.entries);
    });

    it(`should return an empty array if a paginated response doesn't have entries`, () => {
        const paginatedResult: TerraPagerInterface<any> = {
            page: 1,
            totalsCount: 2,
            firstOnPage: 1,
            lastOnPage: 2,
            lastPageNumber: 1,
            isLastPage: true,
            itemsPerPage: 25
        };
        spyOn(dataSource, 'request').and.returnValue(of(paginatedResult));

        dataSource.search();

        expect(dataSource.data).toEqual([]);
    });

    it(`should update the paginator's length if available`, () => {
        const paginatedResult: TerraPagerInterface<any> = {
            page: 1,
            totalsCount: 2,
            firstOnPage: 1,
            lastOnPage: 2,
            lastPageNumber: 1,
            isLastPage: true,
            itemsPerPage: 25
        };
        spyOn(dataSource, 'request').and.returnValue(of(paginatedResult));
        dataSource.paginator = {
            page: new EventEmitter(),
            length: 0
        } as MatPaginator;

        dataSource.search();

        expect(dataSource.paginator.length).toBe(paginatedResult.totalsCount);
    });
});
