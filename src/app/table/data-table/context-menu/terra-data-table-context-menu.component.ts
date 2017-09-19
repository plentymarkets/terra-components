import { Component } from '@angular/core';
import { TerraDataTableContextMenuService } from './service/terra-data-table-context-menu.service';
import { TerraDataTableContextMenuEntryInterface } from './data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';

/**
 * @author mkunze
 */
@Component({
    selector: 'context-menu-holder',
    styles:   [require('./terra-data-table-context-menu.component.scss')],
    template: require('./terra-data-table-context-menu.component.html')
})
export class TerraDataTableContextMenuComponent<D extends TerraBaseData>
{
    private _contextMenuLinkList:Array<TerraDataTableContextMenuEntryInterface<D>> = [];
    private _isShown = false;
    private clickListener:(event:Event) => void;

    private _mouseLocation:{ left:number, top:number } = {
        left: 0,
        top:  0
    };

    constructor(private _contextMenuService:TerraDataTableContextMenuService<D>)
    {
        _contextMenuService.show.subscribe(
            e => this.showMenu(e.event, e.obj));

        this.clickListener = (event) =>
        {
            this.clickedOutside();
            event.stopPropagation();
        }
    }

    get locationCss()
    {
        return {
            'display': this._isShown ? 'block' : 'none',
            left:      this._mouseLocation.left + 'px',
            top:       this._mouseLocation.top + 'px',
        };
    }

    clickedOutside()
    {
        this._isShown = false;
        document.removeEventListener('click', this.clickListener);
    }

    showMenu(event,
             contextMenuLinkList:Array<TerraDataTableContextMenuEntryInterface<D>>)
    {
        this._isShown = true;
        this._contextMenuLinkList = contextMenuLinkList;
        this._mouseLocation = {
            left: event.clientX,
            top:  event.clientY
        };

        event.stopPropagation();
        document.addEventListener('click', this.clickListener);
    }
}
