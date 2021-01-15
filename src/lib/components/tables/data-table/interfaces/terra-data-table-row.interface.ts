import { TerraDataTableCellInterface } from './terra-data-table-cell.interface';

/**
 * @author mkunze
 */
/** @deprecated since v5.0. Please use mat-table instead */
export interface TerraDataTableRowInterface<D> {
    cellList?: Array<TerraDataTableCellInterface>;
    data?: D;
    clickFunction?: () => void;
    isActive?: boolean;
    disabled?: boolean;
    selected?: boolean;
}
