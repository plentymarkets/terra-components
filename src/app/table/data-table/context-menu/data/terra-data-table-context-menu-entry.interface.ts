import { Subject } from 'rxjs/Rx';
import { TerraBaseData } from '../../../../data/terra-base.data';

/**
 * @author mkunze
 */
export interface TerraDataTableContextMenuEntryInterafce<D extends TerraBaseData>
{
    title?:string;
    subject:Subject<TerraDataTableContextMenuEntryInterafce<D>>;
    clickFunction?:(value?:TerraDataTableContextMenuEntryInterafce<D>)=>void;
    data?:D;
    isDivider?:boolean;
}
