import {
    Directive,
    HostListener,
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
    selector: '[contextMenu]',
})
export class TerraDataTableContextMenuDirective<D extends TerraBaseData> implements OnInit
{
    @Input('contextMenu')
    public inputLinks:Array<TerraDataTableContextMenuEntryInterface<D>>;

    constructor(private contextMenuService:TerraDataTableContextMenuService<D>)
    {
    }

    @HostListener('contextmenu', ['$event'])
    public rightClicked(event:MouseEvent):void
    {
        this.contextMenuService.show.next({
            event: event,
            obj:   this.inputLinks
        });
        event.preventDefault();
        event.stopPropagation();
    }

    public ngOnInit():void
    {
        this.contextMenuService.init.next(this.inputLinks);
    }
}
