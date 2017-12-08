/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from '../../data-table/cell/terra-text-align.enum';

export interface TerraSimpleTableHeaderCellInterface
{
    caption:string;
    width:string;
    tooltipText?:string;
    tooltipPlacement?:string;
    textAlign?:TerraTextAlignEnum;
}
