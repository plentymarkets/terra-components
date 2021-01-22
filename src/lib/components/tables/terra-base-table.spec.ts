import { TerraBaseTable } from './terra-base-table';
import { ChangeDetectorRef } from '@angular/core';

describe('TerraBaseTable', () => {
    let cdr: ChangeDetectorRef;
    const baseTable: TerraBaseTable<any> = new TerraBaseTable<any>(cdr);

    it('should create', () => {
        expect(baseTable).toBeTruthy();
    });

    it('should return an empty array for #selectedRowList by default', () => {
        expect(baseTable.selectedRowList).toBeDefined();
        expect(baseTable.selectedRowList.length).toEqual(0);
    });
});
