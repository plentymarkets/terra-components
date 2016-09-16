import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { PlentyDataTableContextMenuEntry } from '../interface/plenty-data-table-context-menu-entry';
import { BaseData } from '../../../../data/base-data';

/**
 * @author mkunze
 */
@Injectable()
export class PlentyDataTableContextMenuService<D extends BaseData>
{
  public show:Subject<{event:MouseEvent,obj:PlentyDataTableContextMenuEntry<D>[]}> =
    new Subject<{event:MouseEvent,obj:PlentyDataTableContextMenuEntry<D>[]}>();
}
