import { TerraSimpleTableCellInterface } from '../cell/terra-simple-table-cell.interface';
/**
 * @author mkunze
 */
export interface TerraSimpleTableRowInterface
{
    cellList:Array<TerraSimpleTableCellInterface>,
    selected?:boolean;
    textColorCss?:string;
}
