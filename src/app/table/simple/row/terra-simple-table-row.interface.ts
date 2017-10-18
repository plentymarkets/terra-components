import { TerraSimpleTableCellInterface } from '../cell/terra-simple-table-cell.interface';

/**
 * @author mkunze
 */
export interface TerraSimpleTableRowInterface<D>
{
    cellList:Array<TerraSimpleTableCellInterface>;
    selected?:boolean;
    value?:D;
    textColorCss?:string;
    backgroundColor?:string;
}
