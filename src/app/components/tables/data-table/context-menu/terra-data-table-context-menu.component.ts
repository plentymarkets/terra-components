import { Component } from '@angular/core';
import { TerraDataTableContextMenuService } from './service/terra-data-table-context-menu.service';
import { TerraDataTableContextMenuEntryInterface } from './data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';

/**
 * @author mkunze
 */
@Component({
    // tslint:disable-next-line
    selector: 'context-menu', // it still exists a terra-context-menu in terra, need to refactored first
    styleUrls:   ['./terra-data-table-context-menu.component.scss'],
    templateUrl: './terra-data-table-context-menu.component.html'
})
export class TerraDataTableContextMenuComponent<D extends TerraBaseData>
{
    protected contextMenuLinkList:Array<TerraDataTableContextMenuEntryInterface<D>> = [];
    protected locationCss:any = {
        visibility: 'hidden',
        left:       0,
        top:        0,
        right:      0
    };

    private isShown:boolean = false;
    private clickListener:(event:Event) => void;

    private mouseLocation:{ left:number, top:number } = {
        left: 0,
        top:  0
    };

    constructor(private contextMenuService:TerraDataTableContextMenuService<D>)
    {
        contextMenuService.show.subscribe(
            (e:any):void => this.showMenu(e.event, e.obj));

        contextMenuService.init.subscribe(
            (e:any):void => this.contextMenuLinkList = e
        );

        this.clickListener = (event:Event):void =>
        {
            this.clickedOutside();
            event.stopPropagation();
        };
    }

    public clickedOutside():void
    {
        this.isShown = false;
        this.locationCss = this.calcMenuPosition();
        document.removeEventListener('click', this.clickListener);
    }

    public showMenu(event:MouseEvent, contextMenuLinkList:Array<TerraDataTableContextMenuEntryInterface<D>>):void
    {
        this.isShown = true;
        this.contextMenuLinkList = contextMenuLinkList;
        this.mouseLocation = {
            left: event.clientX,
            top:  event.clientY
        };

        this.locationCss = this.calcMenuPosition();

        event.stopPropagation();
        document.addEventListener('click', this.clickListener);
    }

    private calcMenuPosition():{ visibility:string, left:string, top:string }
    {
        // 70 (navbar) + 46 (tabbar) + 36 (breadcrumbs)
        let offsetTop:number = 108; // 161
        let offsetLeft:number;
        let anchor:JQuery = $('.context-menu#menu');
        let isMenuAtBottom:boolean;
        let contextMenuHeight:number = anchor.height();
        let contextMenuWidth:number = anchor.width();
        let tableWidth:number;

        let buttomTop:string = this.mouseLocation.top - offsetTop - contextMenuHeight + 'px';
        let top:string = this.mouseLocation.top - offsetTop - 2 + 'px';

        if(this.mouseLocation.top + contextMenuHeight > innerHeight)
        {
            isMenuAtBottom = true;
        }

        let dataTableElement:JQuery = anchor.closest('terra-data-table');

        offsetLeft = dataTableElement.offset().left;

        tableWidth = dataTableElement.find('tbody').width();

        if(Math.abs(this.mouseLocation.left - offsetLeft - 2) + contextMenuWidth > tableWidth)
        {
            offsetLeft = offsetLeft + contextMenuWidth - 6;
        }

        return {
            visibility: this.isShown ? 'visible' : 'hidden',
            left:       this.mouseLocation.left - offsetLeft - 2 + 'px',
            top:        isMenuAtBottom ? buttomTop : top
        };
    }
}
