import { TerraBaseData } from '../../../../data/terra-base.data';

/**
 * @author mkunze
 */
export interface TerraDataTableContextMenuEntryInterface<D extends TerraBaseData>
{
    title?:string;
    clickFunction?:(value?:D) => void;
    data?:D;
    isDivider?:boolean;
}
