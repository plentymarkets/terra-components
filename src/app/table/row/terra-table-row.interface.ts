import { TerraTableCellInterface } from '../cell/terra-table-cell.interface';
import { TerraDataTableContextMenuEntryInterafce } from '../data-table/context-menu/data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../data/terra-base.data';
/**
 * @author mkunze
 */
export interface TerraTableRowInterface<D extends TerraBaseData>
{
  cellList:Array<TerraTableCellInterface>;
  selected?:boolean;
  data?:D;
  clickFunction?:()=>void;
  contextMenuLinkList?:Array<TerraDataTableContextMenuEntryInterafce<D>>;
}
