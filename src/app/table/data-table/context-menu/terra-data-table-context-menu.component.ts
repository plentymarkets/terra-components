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
    private _locationCss:any = {
        visibility: 'hidden',
        left:       0,
        top:        0,
        right:      0
    };

    private _mouseLocation:{ left:number, top:number } = {
        left: 0,
        top:  0
    };

    constructor(private _contextMenuService:TerraDataTableContextMenuService<D>)
    {
        _contextMenuService.show.subscribe(
            e => this.showMenu(e.event, e.obj));

        _contextMenuService.init.subscribe(
            e => this._contextMenuLinkList = e
        );

        this.clickListener = (event) =>
        {
            this.clickedOutside();
            event.stopPropagation();
        }
    }

    clickedOutside()
    {
        this._isShown = false;
        this._locationCss = this.calcMenuPosition();
        document.removeEventListener('click', this.clickListener);
    }

    showMenu(event:MouseEvent, contextMenuLinkList:TerraDataTableContextMenuEntryInterface<D>[])
    {
        this._isShown = true;
        this._contextMenuLinkList = contextMenuLinkList;
        this._mouseLocation = {
            left: event.clientX,
            top:  event.clientY
        };

        this._locationCss = this.calcMenuPosition();

        event.stopPropagation();
        document.addEventListener('click', this.clickListener);
    }

    private calcMenuPosition():{ visibility:string, left:string, top:string }
    {
        // 70 (navbar) + 46 (tabbar) + 36 (breadcrumbs)
        let offsetTop:number = 161;
        let offsetLeft:number;
        let anchor = $('.context-menu#menu');
        let isMenuAtBottom:boolean;
        let contextMenuHeight:number = anchor.height();
        let contextMenuWidth:number = anchor.width();
        let tableWidth:number;

        if(this._mouseLocation.top + contextMenuHeight > innerHeight)
        {
            isMenuAtBottom = true;
        }

        let dataTableElement = anchor.closest('terra-data-table');

        offsetLeft = dataTableElement.offset().left;

        tableWidth = dataTableElement.find('tbody').width();

        if(Math.abs(this._mouseLocation.left - offsetLeft - 2) + contextMenuWidth > tableWidth)
        {
            offsetLeft = offsetLeft + contextMenuWidth - 6
        }

        return {
            visibility: this._isShown ? 'visible' : 'hidden',
            left:       this._mouseLocation.left - offsetLeft - 2 + 'px',
            top:        isMenuAtBottom ? this._mouseLocation.top - offsetTop - contextMenuHeight + 'px' : this._mouseLocation.top - offsetTop - 2 + 'px'
        };
    }
}
