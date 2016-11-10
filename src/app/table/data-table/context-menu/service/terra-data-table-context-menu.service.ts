import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { TerraDataTableContextMenuEntryInterafce } from '../data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../../data/terra-base.data';

/**
 * @author mkunze
 */
@Injectable()
export class TerraDataTableContextMenuService<D extends TerraBaseData>
{
    public show:Subject<{event:MouseEvent,obj:TerraDataTableContextMenuEntryInterafce<D>[]}> =
        new Subject<{event:MouseEvent,obj:TerraDataTableContextMenuEntryInterafce<D>[]}>();
}
