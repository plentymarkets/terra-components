/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';

export interface TerraDataTableHeaderCellInterface
{
    caption:string;
    width:number;
    /**
     * If given, the list can be sorted by the given identifier
     */
    sortBy?:string;
    isHidden?:boolean;
    tooltipText?:string;
    tooltipPlacement?:string;
    textAlign?:TerraTextAlignEnum;
}
