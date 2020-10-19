/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from '../../data-table/enums/terra-text-align.enum';

/** @deprecated since v5.0. Please use mat-table instead. */
export interface TerraSimpleTableHeaderCellInterface {
    caption: string;
    width: string;
    tooltipText?: string;
    tooltipPlacement?: string;
    textAlign?: TerraTextAlignEnum;
}
