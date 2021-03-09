import { Pipe, PipeTransform } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { ColumnInterface } from '../interface/column.interface';

/**
 * @description A pipe to check sticky columns
 */
@Pipe({
    name: 'isSticky'
})
export class IsStickyPipe implements PipeTransform {
    /**
     * @description Returns true if the passed column has the attribute `sticky` or `stickyEnd`.
     * @param column
     * @param columnDefs
     */
    public transform(column: ColumnInterface, columnDefs: Map<string, CdkColumnDef>): boolean {
        const col: CdkColumnDef = columnDefs?.get(column.key);
        return col && (col.sticky || col.stickyEnd);
    }
}
