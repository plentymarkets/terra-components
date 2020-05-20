import { TableDataSource } from './table-data-source';
import { RequestParameterInterface } from './request-parameter.interface';
import { TerraPagerInterface } from '../pager/data/terra-pager.interface';
import {
    Observable,
    of
} from 'rxjs';
import { TerraFilter } from './filter';

class TestDataSource extends TableDataSource<{}>
{
    public request(requestParams:RequestParameterInterface):Observable<Array<{}>> | Observable<TerraPagerInterface<{}>>
    {
        return of(new Array({}));
    }
}

interface FilterParams
{
    id:number;
}

describe('TableDataSource', () =>
{
    let dataSource:TestDataSource;
    let filter:TerraFilter<FilterParams>;

    beforeEach(() =>
    {
        dataSource = new TestDataSource();
        filter = new TerraFilter<FilterParams>();
    });

    it('should create', () =>
    {
        expect(dataSource).toBeTruthy();
        expect(filter).toBeTruthy();
    });

    it('should create an observable for a request', () =>
    {
        expect(dataSource.request({})).toBeTruthy();
    });

    it('should have a filter', () =>
    {
        filter.filterParameter = {id: 1};
        dataSource.filter = filter;

        expect(dataSource.filter).toEqual(filter);
    });

    it('should have data after search', () =>
    {
        dataSource.connect(undefined).subscribe((result:Array<{}>) => expect(result).toBe([]));
    });
});
