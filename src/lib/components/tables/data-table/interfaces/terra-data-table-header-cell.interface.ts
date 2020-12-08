/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';

/** @deprecated since v5.0. Please use mat-table instead */
export interface TerraDataTableHeaderCellInterface {
    caption: string;
    width: number;
    /**
     * If given, the list can be sorted by the given identifier
     */
    sortBy?: string;
    isHidden?: boolean;
    tooltipText?: string;
    tooltipPlacement?: string;
    textAlign?: TerraTextAlignEnum;
}
