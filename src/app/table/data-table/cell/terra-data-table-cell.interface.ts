import { TerraButtonInterface } from '../../../button/data/terra-button.interface';
import { TerraDataTableTextInterface } from './terra-data-table-text.interface';
import { TerraTagInterface } from '../../../tag/data/terra-tag.interface';

/**
 * @author mkunze
 */

export enum TerraRefTypeEnum
{
    email = 'mailto',
    phone = 'tel'
}

export interface TerraDataTableCellInterface
{
    identifier:string;
    data?: string | number | TerraDataTableTextInterface  | TerraRefTypeEnum | Array<TerraButtonInterface> | Array<TerraTagInterface>
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
