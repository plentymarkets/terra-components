import { TerraSimpleTableCellInterface } from '../cell/terra-simple-table-cell.interface';

/**
 * @author mkunze
 */
/** @deprecated since v5.0. Please use mat-table instead. */
export interface TerraSimpleTableRowInterface<D> {
    cellList: Array<TerraSimpleTableCellInterface>;
    value?: D;
    textColorCss?: string;
    backgroundColor?: string;
    disabled?: boolean;
    selected?: boolean;
}
