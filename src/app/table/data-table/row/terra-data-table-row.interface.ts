import { TerraDataTableCellInterface } from '../cell/terra-data-table-cell.interface';
import { TerraDataTableContextMenuEntryInterface } from '../context-menu/data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';

/**
 * @author mkunze
 */
export interface TerraDataTableRowInterface<D>
{
    cellList:Array<TerraDataTableCellInterface>;
    data?:D;
    clickFunction?:() => void;
    contextMenuLinkList?:Array<TerraDataTableContextMenuEntryInterface<D>>;
    isActive?:boolean;
    disabled?:boolean;
}
