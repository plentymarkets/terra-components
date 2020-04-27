/**
 * @author mkunze
 */
import { TerraTextAlignEnum } from '../enums/terra-text-align.enum';

export interface TerraDataTableHeaderCellInterface {
  caption: string;
  width: number;
  /**
   * If given, the list can be sorted by the given identifier
   */
  sortBy?: string;
  isHidden?: boolean;
  tooltipText?: string;
  /**
   * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
   */
  tooltipPlacement?: string;
  textAlign?: TerraTextAlignEnum;
}
