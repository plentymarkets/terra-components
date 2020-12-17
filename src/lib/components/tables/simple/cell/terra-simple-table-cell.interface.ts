import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

/**
 * @author mkunze
 */
/** @deprecated since v5.0. Please use mat-table instead. */
export interface TerraSimpleTableCellInterface {
    caption?: string | number;
    icon?: string;
    buttonList?: Array<TerraButtonInterface>;
    tooltipText?: string;
    tooltipPlacement?: string;
    buttonListAlignRight?: boolean;
}
