import {
    Directive,
    HostListener,
    Input
} from '@angular/core';
import { TerraBaseData } from '../../../data/terra-base.data';
import { TerraDataTableContextMenuService } from './terra-data-table-context-menu.service';

/**
 * @author mkunze
 */
@Directive({
    selector: '[hasContextMenu]',
})
export class TerraDataTableContextMenuDirective<D extends TerraBaseData>
{
    /**
     * @description data that is passed to the context menu component when clicking on a row
     */
    @Input()
    public rowData:D;

    constructor(private _service:TerraDataTableContextMenuService<D>)
    {
    }

    @HostListener('contextmenu', ['$event'])
    public rightClicked(event:MouseEvent):void
    {
        event.preventDefault();
        event.stopPropagation();
        this._service.show.next({
            event: event,
            data:  this.rowData
        });
    }
}
