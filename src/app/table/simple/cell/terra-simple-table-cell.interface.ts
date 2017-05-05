import { TerraButtonInterface } from '../../../button/data/terra-button.interface';
/**
 * @author mkunze
 */
export interface TerraSimpleTableCellInterface
{
    caption?:string | number;
    icon?:string;
    buttonList?:Array<TerraButtonInterface>;
    tooltipText?:string;
    tooltipPlacement?:string;
    buttonListAlignRight?:boolean;
}
