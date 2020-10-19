import { TerraBaseData } from '../../../../data/terra-base.data';
import { TerraButtonColorEnum } from '../../../../../helpers/enums/button-color.enum';

/**
 * @author mkunze
 */
/** @deprecated since v5.0. Please use mat-table instead */
export interface TerraDataTableContextMenuEntryInterface<D extends TerraBaseData> {
    title?: string;
    clickFunction?: (data?: D) => void;
    isDivider?: boolean;
    buttonColor?: TerraButtonColorEnum;
}
