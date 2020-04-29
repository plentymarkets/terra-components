import { TerraDataTableCellInterface } from './terra-data-table-cell.interface';

/**
 * @author mkunze
 */
export interface TerraDataTableRowInterface<D> {
    cellList?: Array<TerraDataTableCellInterface>;
    data?: D;
    clickFunction?: () => void;
    isActive?: boolean;
    disabled?: boolean;
    selected?: boolean;
}
