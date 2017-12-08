/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from './terra-text-align.interface';

export interface TerraDataTableHeaderCellInterface
{
    caption:string;
    identifier:string;
    width:number;
    isHidden?:boolean;
    tooltipText?:string;
    tooltipPlacement?:string;
    /**
     * @deprecated type 'string' will be removed in next major release. Please only use values of type TerraTextAlignEnum instead.
     */
    textAlign?:string | TerraTextAlignEnum;
}
