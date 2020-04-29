import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

/**
 * @author mkunze
 */
export interface TerraSimpleTableCellInterface {
    caption?: string | number;
    icon?: string;
    buttonList?: Array<TerraButtonInterface>;
    tooltipText?: string;
    /**
     * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
     */
    tooltipPlacement?: string;
    buttonListAlignRight?: boolean;
}
