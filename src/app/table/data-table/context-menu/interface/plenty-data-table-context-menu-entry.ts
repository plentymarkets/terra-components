import { Subject } from 'rxjs/Rx';
import { BaseData } from '../../../../data/base-data';

/**
 * @author mkunze
 */
export interface PlentyDataTableContextMenuEntry<D extends BaseData>
{
  title?:string;
  subject:Subject<PlentyDataTableContextMenuEntry<D>>;
  clickFunction?:(value?:PlentyDataTableContextMenuEntry<D>)=>void;
  data?:D;
  isDivider?:boolean;
}
