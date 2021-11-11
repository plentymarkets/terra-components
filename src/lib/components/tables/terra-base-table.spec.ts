import { TerraBaseTable } from './terra-base-table';
import { ChangeDetectorRef } from '@angular/core';
import { TerraDataTableRowInterface } from './data-table/interfaces/terra-data-table-row.interface';

class MockBaseTable extends TerraBaseTable<any> {
    public inputHasCheckboxes: boolean = false;
    protected _rowList: Array<TerraDataTableRowInterface<any>>;
}

describe('TerraBaseTable', () => {
    let cdr: ChangeDetectorRef;
    const baseTable: TerraBaseTable<any> = new MockBaseTable(cdr);

    it('should create', () => {
        expect(baseTable).toBeTruthy();
    });

    it('should return an empty array for #selectedRowList by default', () => {
        expect(baseTable.selectedRowList).toBeDefined();
        expect(baseTable.selectedRowList.length).toEqual(0);
    });
});
