import { IsStickyPipe } from './is-sticky.pipe';
import { ColumnInterface } from '../interface/column.interface';
import { CdkColumnDef } from '@angular/cdk/table';

describe('IsStickyPipe', () => {
    const pipe: IsStickyPipe = new IsStickyPipe();
    const column: ColumnInterface = { key: 'TestName1', label: 'TestName1' };

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return true for a sticky column', () => {
        const stickyProp: CdkColumnDef = { sticky: true, stickyEnd: false } as CdkColumnDef;
        const columnDefs: Map<string, CdkColumnDef> = new Map([[column.key, stickyProp]]);
        expect(pipe.transform(column, columnDefs)).toBe(true);
    });

    it('should return true for a stickyEnd column', () => {
        const stickyProp: CdkColumnDef = { sticky: false, stickyEnd: true } as CdkColumnDef;
        const columnDefs: Map<string, CdkColumnDef> = new Map([[column.key, stickyProp]]);
        expect(pipe.transform(column, columnDefs)).toBe(true);
    });

    it('should return false for a column without sticky attribute', () => {
        const stickyProp: CdkColumnDef = { sticky: false, stickyEnd: false } as CdkColumnDef;
        const columnDefs: Map<string, CdkColumnDef> = new Map([[column.key, stickyProp]]);
        expect(pipe.transform(column, columnDefs)).toBe(false);
    });

    it('should return undefined for a column with undefined columnDefs', () => {
        const emptyCol: ColumnInterface = {} as ColumnInterface;
        expect(pipe.transform(emptyCol, undefined)).toBe(undefined);
    });
});
