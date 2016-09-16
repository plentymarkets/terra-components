import { PlentyTableCell } from '../cell/plenty-table-cell';
import { PlentyDataTableContextMenuEntry } from '../data-table/context-menu/interface/plenty-data-table-context-menu-entry';
import { BaseData } from '../../data/base-data';
/**
 * @author mkunze
 */
export interface PlentyTableRow<D extends BaseData>
{
  cellList:Array<PlentyTableCell>;
  selected?:boolean;
  data?:D;
  clickFunction?:()=>void;
  contextMenuLinkList?:Array<PlentyDataTableContextMenuEntry<D>>;
}
