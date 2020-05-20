import { RequestParameterInterface } from './request-parameter.interface';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';
import {
    Observable,
    of
} from 'rxjs';
import { TableSortingDataSource } from './table-sorting-data-source';
import { MatSort } from '@angular/material/sort';

class TestDataSource extends TableSortingDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<Array<{}>> | Observable<TerraPagerInterface<{}>>
    {
        return of(new Array({}));
    }
}

fdescribe('TableSortingDataSource', () =>
{
    let dataSource:TestDataSource;

    beforeEach(() =>
    {
        dataSource = new TestDataSource();
        dataSource.sort = new MatSort();
    });

    it('should create', () =>
    {
        expect(dataSource).toBeTruthy();
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
