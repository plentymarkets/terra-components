import {
    Directive,
    Input,
    OnInit
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
export class TerraDataTableContextMenuDirective<D extends TerraBaseData> implements OnInit
{
    @Input('context-menu') inputLinks:Array<TerraDataTableContextMenuEntryInterface<D>>;

    constructor(private _contextMenuService:TerraDataTableContextMenuService<D>)
    {
    }

    ngOnInit():void
    {
        this._contextMenuService.init.next(this.inputLinks);
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
