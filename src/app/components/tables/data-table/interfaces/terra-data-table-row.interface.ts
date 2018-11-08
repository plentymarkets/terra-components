import { TerraDataTableCellInterface } from './terra-data-table-cell.interface';
import { TerraDataTableContextMenuEntryInterface } from '../context-menu/data/terra-data-table-context-menu-entry.interface';

/**
 * @author mkunze
 */
export interface TerraDataTableRowInterface<D>
{
    cellList:Array<TerraDataTableCellInterface>;
    data?:D;
    clickFunction?:() => void;
    isActive?:boolean;
    disabled?:boolean;
    selected?:boolean;
}
