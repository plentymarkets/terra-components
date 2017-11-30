import { TerraButtonInterface } from '../../../button/data/terra-button.interface';
import { TerraDataTableTextInterface } from './terra-data-table-text.interface';
import { TerraTagInterface } from '../../../tag/data/terra-tag.interface';
import {
    TerraRefTypeEnum,
    TerraRefTypeInterface
} from './terra-ref-type.interface';

/**
 * @author mkunze
 */


export interface TerraDataTableCellInterface
{
    identifier:string;
    data?:string | number | TerraDataTableTextInterface | TerraRefTypeInterface | Array<TerraButtonInterface> | Array<TerraTagInterface>;
    isHidden?:boolean;
    tooltipText?:string;
    tooltipPlacement?:string;
    /**
     * @deprecated
     */
    caption?:string | number;
    /**
     * @deprecated
     */
    icon?:string;
    /**
     * @deprecated
     */
    buttonList?:Array<TerraButtonInterface>;
    /**
     * @deprecated
     */
    color?:string;
    /**
     * @deprecated
     */
    href?:TerraRefTypeEnum;
}
