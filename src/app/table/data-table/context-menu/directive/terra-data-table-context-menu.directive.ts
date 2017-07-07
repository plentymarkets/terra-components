import {
    Directive,
    Input
} from '@angular/core';
import { TerraDataTableContextMenuService } from '../service/terra-data-table-context-menu.service';
import { TerraDataTableContextMenuEntryInterface } from '../data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../../data/terra-base.data';

/**
 * @author mkunze
 */
@Directive({
               selector: '[context-menu]',
               host:     {'(contextmenu)': 'rightClicked($event)'}
           })
export class TerraDataTableContextMenuDirective<D extends TerraBaseData>
{
    @Input('context-menu') inputLinks:Array<TerraDataTableContextMenuEntryInterface<D>>;

    constructor(private _contextMenuService:TerraDataTableContextMenuService<D>)
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
