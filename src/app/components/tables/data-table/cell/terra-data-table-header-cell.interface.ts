/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from './terra-text-align.enum';

export interface TerraDataTableHeaderCellInterface
{
    caption:string;
    identifier:string;
    width:number;
    isHidden?:boolean;
    tooltipText?:string;
    tooltipPlacement?:string;
    textAlign?:TerraTextAlignEnum;
}
