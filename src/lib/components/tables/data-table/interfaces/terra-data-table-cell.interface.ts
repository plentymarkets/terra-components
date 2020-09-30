import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';
import { TerraDataTableTextInterface } from './terra-data-table-text.interface';
import { TerraTagInterface } from '../../../layouts/tag/data/terra-tag.interface';
import { TerraHrefTypeInterface } from './terra-href-type.interface';

/**
 * @author mkunze
 */
export interface TerraDataTableCellInterface {
    data:
        | string
        | number
        | TerraDataTableTextInterface
        | TerraHrefTypeInterface
        | Array<TerraButtonInterface>
        | Array<TerraTagInterface>;
    isHidden?: boolean;
    tooltipText?: string;
    tooltipPlacement?: string;
}
