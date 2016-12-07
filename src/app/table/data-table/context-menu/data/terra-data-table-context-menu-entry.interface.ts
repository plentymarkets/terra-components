import { Subject } from 'rxjs/Rx';
import { TerraBaseData } from '../../../../data/terra-base.data';

/**
 * @author mkunze
 */
export interface TerraDataTableContextMenuEntryInterface<D extends TerraBaseData>
{
    title?:string;
    subject:Subject<TerraDataTableContextMenuEntryInterface<D>>;
    clickFunction?:(value?:TerraDataTableContextMenuEntryInterface<D>)=>void;
    data?:D;
    isDivider?:boolean;
}
