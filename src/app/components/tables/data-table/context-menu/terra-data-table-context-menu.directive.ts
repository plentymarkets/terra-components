import {
    Directive,
    HostListener,
    Input
} from '@angular/core';
import { TerraDataTableContextMenuEntryInterface } from './data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';
import { TerraDataTableContextMenuService } from './terra-data-table-context-menu.service';

/**
 * @author mkunze
 */
@Directive({
    selector: '[contextMenu]',
})
export class TerraDataTableContextMenuDirective<D extends TerraBaseData>
{
    @Input('contextMenu')
    public set links(links:Array<TerraDataTableContextMenuEntryInterface<D>>)
    {
        this.service.setLinkList.next(links);
    }

    @Input()
    public rowData:D;

    constructor(private service:TerraDataTableContextMenuService<D>)
    {
    }

    @HostListener('contextmenu', ['$event'])
    public rightClicked(event:MouseEvent):void
    {
        this.service.show.next({
            event: event,
            data:  this.rowData
        });
        event.preventDefault();
        event.stopPropagation();
    }
}
