import { TerraBaseData } from '../../../../data/terra-base.data';
import { TerraButtonColorEnum } from '../../../../buttons/button/enum/button-color.enum';

/**
 * @author mkunze
 */
export interface TerraDataTableContextMenuEntryInterface<D extends TerraBaseData>
{
    title?:string;
    clickFunction?:(value?:D) => void;
    data?:D;
    isDivider?:boolean;
    buttonColor?:TerraButtonColorEnum;
}
