import { TerraButtonInterface } from '../../button/data/terra-button.interface';
/**
 * @author mkunze
 */
export interface TerraTableCellInterface
{
    identifier:string;
    caption?:string | number;
    isHidden?:boolean;
    icon?:string;
    buttonList?:Array<TerraButtonInterface>;
    tooltipText?:string;
    tooltipPlacement?:string;
}
