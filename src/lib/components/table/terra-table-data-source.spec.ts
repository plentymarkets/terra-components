import { TerraTableDataSource } from './terra-table-data-source';
import { RequestParameterInterface } from './request-parameter.interface';
import { Observable, of } from 'rxjs';

class ConcreteTableDataSource extends TerraTableDataSource<{}> {
    public request(requestParams: RequestParameterInterface): Observable<Array<{}>> {
        return of(new Array({}));
    }
}

describe('TerraTableDataSource', () => {
    let dataSource: ConcreteTableDataSource;

    beforeEach(() => (dataSource = new ConcreteTableDataSource()));

    afterEach(() => dataSource.disconnect());

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
});
