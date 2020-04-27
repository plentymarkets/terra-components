import { TerraDataTableExampleInterface } from './example/terra-data-table.interface.example';
import { TerraDataTableServiceExample } from './example/terra-data-table.service.example';
import { Observable } from 'rxjs';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';

describe('Service: TerraDataTableBaseService', () => {
  let service: TerraDataTableServiceExample;
  let data: TerraDataTableExampleInterface;
  let pagerData: TerraPagerParameterInterface;

  beforeEach(() => {
    service = new TerraDataTableServiceExample();
    data = {
      id: 1,
      value: 5
    };
    pagerData = {
      page: 1,
      itemsPerPage: 25
    };
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should have an empty row list', () => {
    expect(service.rowList).toBeDefined();
    expect(service.rowList.length).toBe(0);
  });

  it("should have an abstract method 'requestTableData()' which returns an Observable", () => {
    expect(service.requestTableData(pagerData)).toEqual(jasmine.any(Observable));
  });

  it("should have an abstract method 'dataToRowMapping()' which returns a TerraDataTableRowInterface", () => {
    // expect(service.dataToRowMapping(data).data).toEqual(jasmine.any(data));
    expect(service.dataToRowMapping(data).data).toEqual(
      jasmine.objectContaining({
        id: 1,
        value: 5
      })
    );
  });

  it('should change paging data if updatePagingData() is called', () => {
    let oldData: TerraPagerInterface<any> = service.pagingData;

    let updatedData: TerraPagerInterface<any> = {
      page: 2,
      totalsCount: 2,
      isLastPage: true,
      lastPageNumber: 2,
      firstOnPage: 26,
      lastOnPage: 28,
      itemsPerPage: 25
    };
    service.updatePagingData(updatedData);
    expect(service.pagingData).not.toEqual(oldData);
  });

  // TODO getResults
});
