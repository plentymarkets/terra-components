/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from '../../data-table/enums/terra-text-align.enum';

export interface TerraSimpleTableHeaderCellInterface {
    caption: string;
    width: string;
    tooltipText?: string;
    tooltipPlacement?: string;
    textAlign?: TerraTextAlignEnum;
}
