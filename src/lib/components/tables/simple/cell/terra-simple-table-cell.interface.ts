import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

/**
 * @author mkunze
 */
export interface TerraSimpleTableCellInterface
{
    caption?:string | number;
    icon?:string;
    buttonList?:Array<TerraButtonInterface>;
    tooltipText?:string;
    /**
     * @deprecated not used anymore since the new tooltip directive exists.
     */
    tooltipPlacement?:string;
    buttonListAlignRight?:boolean;
}
