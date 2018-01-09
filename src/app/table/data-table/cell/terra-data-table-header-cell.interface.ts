/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from './terra-text-align.enum';

export interface TerraDataTableHeaderCellInterface
{
    caption:string;
    width:number;
    /**
     * this parameter should state the name of the corresponding data base table cell
     */
    sortBy?:string;
    isHidden?:boolean;
    tooltipText?:string;
    tooltipPlacement?:string;
    textAlign?:TerraTextAlignEnum;
}
