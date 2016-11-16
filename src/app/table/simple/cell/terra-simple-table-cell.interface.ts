import { TerraButtonInterface } from '../../../button/data/terra-button.interface';
/**
 * @author michaelkunze
 */
export interface TerraSimpleTableCellInterface
{
    caption?:string | number;
    icon?:string;
    buttonList?:Array<TerraButtonInterface>;
    tooltipText?:string;
    tooltipPlacement?:string;
}