import {
    Directive,
    Input
} from '@angular/core';
import { PlentyDataTableContextMenuService } from '../service/plenty-data-table-context-menu.service';
import { PlentyDataTableContextMenuEntry } from '../interface/plenty-data-table-context-menu-entry';
import { BaseData } from '../../../../data/base-data';

/**
 * @author mkunze
 */
@Directive({
               selector: '[context-menu]',
               host:     {'(contextmenu)': 'rightClicked($event)'}
           })
export class PlentyDataTableContextMenuDirective<D extends BaseData>
{
    @Input('context-menu') inputLinks:Array<PlentyDataTableContextMenuEntry<D>>;
    
    constructor(private _contextMenuService:PlentyDataTableContextMenuService<D>)
    {
    }
    
    rightClicked(event:MouseEvent)
    {
        this._contextMenuService.show.next({
                                               event: event,
                                               obj:   this.inputLinks
                                           });
        event.preventDefault();
    }
}
