import { PlentyButtonInterface } from '../../button/data/plenty-button.interface';
/**
 * @author mkunze
 */
export interface PlentyTableCell
{
    identifier:string;
    caption?:string | number;
    isHidden?:boolean;
    icon?:string;
    buttonList?:Array<PlentyButtonInterface>;
    tooltipText?:string;
    tooltipPlacement?:string;
}
