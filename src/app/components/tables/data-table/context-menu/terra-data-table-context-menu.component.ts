import {
    Component,
    OnInit
} from '@angular/core';
import { TerraDataTableContextMenuEntryInterface } from './data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';
import { TerraDataTableContextMenuService } from './terra-data-table-context-menu.service';

/**
 * @author mkunze
 */
@Component({
    // tslint:disable-next-line
    selector: 'context-menu', // it still exists a terra-context-menu in terra, need to refactored first
    styles:   [require('./terra-data-table-context-menu.component.scss')],
    template: require('./terra-data-table-context-menu.component.html')
})
export class TerraDataTableContextMenuComponent<D extends TerraBaseData> implements OnInit
{
    protected contextMenuLinkList:Array<TerraDataTableContextMenuEntryInterface<D>> = [];
    protected data:D;
    protected locationCss:any = {
        left:       0,
        top:        0,
        right:      0
    };

    protected isShown:boolean = false;
    private clickListener:(event:Event) => void;

    constructor(private contextMenuService:TerraDataTableContextMenuService<D>)
    {
        this.clickListener = (event:Event):void =>
        {
            this.clickedOutside();
            event.stopPropagation();
        };
    }

    public ngOnInit():void
    {
        this.contextMenuService.show.subscribe((e:{event:MouseEvent, data:D}):void =>
        {
            this.showMenu(e.event, e.data);
        });
        this.contextMenuService.setLinkList.subscribe((linkList:Array<TerraDataTableContextMenuEntryInterface<D>>) =>
        {
            this.contextMenuLinkList = linkList;
        });
    }

    public clickedOutside():void
    {
        this.isShown = false;
        document.removeEventListener('click', this.clickListener);
    }

    public showMenu(event:MouseEvent, data:D):void
    {
        this.isShown = true;
        this.data = data;
        this.locationCss = this.calcMenuPosition(event.clientX, event.clientY);

        event.stopPropagation();
        document.addEventListener('click', this.clickListener);
    }

    private calcMenuPosition(mouseLeft:number, mouseTop:number):{left:string, top:string }
    {
        // 70 (navbar) + 46 (tabbar) + 36 (breadcrumbs)
        let offsetTop:number = 108; // 161
        let offsetLeft:number;
        let anchor:JQuery = $('.context-menu#menu');
        let isMenuAtBottom:boolean;
        let contextMenuHeight:number = anchor.height();
        let contextMenuWidth:number = anchor.width();
        let tableWidth:number;

        let buttomTop:string = mouseTop - offsetTop - contextMenuHeight + 'px';
        let top:string = mouseTop - offsetTop - 2 + 'px';

        if(mouseTop + contextMenuHeight > innerHeight)
        {
            isMenuAtBottom = true;
        }

        let dataTableElement:JQuery = anchor.closest('terra-data-table');

        offsetLeft = dataTableElement.offset().left;

        tableWidth = dataTableElement.find('tbody').width();

        if(Math.abs(mouseLeft - offsetLeft - 2) + contextMenuWidth > tableWidth)
        {
            offsetLeft = offsetLeft + contextMenuWidth - 6;
        }

        return {
            left:       mouseLeft - offsetLeft - 2 + 'px',
            top:        isMenuAtBottom ? buttomTop : top
        };
    }
}
