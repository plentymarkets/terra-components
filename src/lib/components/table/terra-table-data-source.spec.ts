import { EventEmitter } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { TerraTableDataSource } from './terra-table-data-source';
import { TerraFilter } from './filter';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';

// tslint:disable:max-function-line-count
describe('TerraTableDataSource', () => {
    let dataSource: TerraTableDataSource<{}>;

    beforeEach(() => {
        dataSource = new TerraTableDataSource(() => of([{}]));
    });

    it('should create', () => {
        expect(dataSource).toBeTruthy();
    });

    it('should implement a `disconnect` method', () => {
        expect(dataSource.disconnect).toBeTruthy();
        expect(dataSource.disconnect).not.toThrow();
    });

    it('should be able to manually set data', () => {
        const newData: Array<any> = [{ foo: 'bar' }];
        dataSource.data = newData;
        expect(dataSource.data).toEqual(newData);
    });

    it('should notify the table when data has been updated manually', () => {
        let data: Array<any> = dataSource.data;
        expect(data).toEqual([]);
        dataSource.connect().subscribe((d: Array<any>) => (data = d));

        const newData: Array<any> = [{ foo: 'bar' }];
        dataSource.data = newData;

        expect(data).toEqual(newData);
    });

    it('should start a request when search is called', () => {
        spyOn(dataSource, 'request').and.callThrough();

        dataSource.search();

        expect(dataSource.request).toHaveBeenCalledWith({});
        expect(dataSource.data).toEqual([{}]);
    });

    it('should start a request when reload is called', () => {
        spyOn(dataSource, 'request').and.callThrough();

        dataSource.reload();

        expect(dataSource.request).toHaveBeenCalledWith({});
        expect(dataSource.data).toEqual([{}]);
    });

    describe('with filtering', () => {
        let filter: TerraFilter<any>;
        beforeEach(() => {
            filter = new TerraFilter();
            dataSource.filter = filter;
        });

        it('should be able to assign a filter', () => {
            expect(dataSource.filter).toBe(filter);
        });

        it('should start a request when a search is triggered via the filter', () => {
            spyOn(dataSource, 'request').and.callThrough();

            filter.search();

            expect(dataSource.request).toHaveBeenCalled();
        });

        it('should pass filter parameters to the request', () => {
            spyOn(dataSource, 'request').and.callThrough();

            filter.filterParameter = { id: 123, foo: 'bar' };

            filter.search();

            expect(dataSource.request).toHaveBeenCalledWith(filter.filterParameter);
        });
    });

    describe('with sorting', () => {
        let sort: MatSort;
        beforeEach(() => {
            sort = {
                active: 'foo',
                direction: 'desc',
                sortChange: new EventEmitter()
            } as MatSort;
            dataSource.sort = sort;
        });

        it('should be able to assign a MatSort instance', () => {
            expect(dataSource.sort).toBe(sort);
        });

        it('should start a request when MatSort is given, data is present and a sort event occurs', fakeAsync(() => {
            dataSource.data = [{}];

            spyOn(dataSource, 'request').and.callThrough();

            sort.sortChange.emit();

            // due to debounceTime operator
            tick(500);

            expect(dataSource.request).toHaveBeenCalledWith({
                sortBy: sort.active,
                sortOrder: sort.direction
            });
        }));
    });

    describe('with paging', () => {
        let paginator: MatPaginator;
        beforeEach(() => {
            paginator = {
                pageIndex: 1,
                pageSize: 25,
                page: new EventEmitter()
            } as MatPaginator;
            dataSource.paginator = paginator;
        });

        it('should be able to assign a paginator instance', () => {
            expect(dataSource.paginator).toBe(paginator);
        });

        it('should reload with the same page', () => {
            paginator.pageIndex = 2;

            dataSource.reload();

            expect(paginator.pageIndex).toBe(2);
        });

        it('should search with intial page', () => {
            paginator.pageIndex = 2;

            dataSource.search();

            expect(paginator.pageIndex).toBe(0);
        });

        it('should start a request when a paginator is available, data is present and the page or pageSize has changed', fakeAsync(() => {
            dataSource.data = [{}];

            spyOn(dataSource, 'request').and.callThrough();

            paginator.page.emit();

            // due to debounceTime operator
            tick(500);

            expect(dataSource.request).toHaveBeenCalledWith({
                page: paginator.pageIndex + 1,
                itemsPerPage: paginator.pageSize
            });
        }));
    });

    describe('targeting a paginated api', () => {
        let paginatedResult: TerraPagerInterface<any>;
        beforeEach(() => {
            paginatedResult = {
                page: 1,
                totalsCount: 2,
                firstOnPage: 1,
                lastOnPage: 2,
                lastPageNumber: 1,
                isLastPage: true,
                itemsPerPage: 25
            };
            spyOn(dataSource, 'request').and.returnValue(of(paginatedResult));
        });

        it('should return entries of the paginated response', () => {
            paginatedResult.entries = [{}, {}];

            dataSource.search();

            expect(dataSource.data).toBe(paginatedResult.entries);
        });

        it(`should return an empty array if the paginated response doesn't have entries`, () => {
            dataSource.search();

            expect(dataSource.data).toEqual([]);
        });

        it(`should update the paginator's length with the total count of results`, () => {
            dataSource.paginator = {
                page: new EventEmitter(),
                length: 0
            } as MatPaginator;

            dataSource.search();

            expect(dataSource.paginator.length).toBe(paginatedResult.totalsCount);
        });
    });
});
