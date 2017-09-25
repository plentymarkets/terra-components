import { TerraDataTableCellInterface } from '../cell/terra-data-table-cell.interface';
import { TerraDataTableContextMenuEntryInterface } from '../context-menu/data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';

/**
 * @author mkunze
 */
export interface TerraDataTableRowInterface<D extends TerraBaseData>
{
    cellList:Array<TerraDataTableCellInterface>;
    selected?:boolean;
    data?:D;
    clickFunction?:() => void;
    contextMenuLinkList?:Array<TerraDataTableContextMenuEntryInterface<D>>;
    isActive?:boolean;
}
