import { TerraTableDataSource } from './terra-table-data-source';
import { RequestParameterInterface } from './request-parameter.interface';
import { Observable, of } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { TerraFilter } from './filter';
import { MatSort } from '@angular/material/sort';

class ConcreteTableDataSource extends TerraTableDataSource<{}> {
    public request(requestParams: RequestParameterInterface): Observable<Array<{}>> {
        return of(new Array({}));
    }
}

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

    it('should be able to assign a paginator instance', () => {
        const paginator: MatPaginator = {
            pageIndex: 1,
            pageSize: 25,
            page: new EventEmitter<PageEvent>()
        } as MatPaginator;
        dataSource.paginator = paginator;
        expect(dataSource.paginator).toBe(paginator);
    });
});
