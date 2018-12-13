import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraDataTableContextMenuEntryInterface } from './data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../data/terra-base.data';
import { TerraDataTableContextMenuService } from './terra-data-table-context-menu.service';
import { isNullOrUndefined } from 'util';

/**
 * @author mkunze
 */
@Component({
    // tslint:disable-next-line
    selector: 'context-menu', // it still exists a terra-context-menu in terra, need to refactored first
    styles:   [require('./terra-data-table-context-menu.component.scss')],
    template: require('./terra-data-table-context-menu.component.html')
})
export class TerraDataTableContextMenuComponent<D extends TerraBaseData> implements OnInit, OnDestroy
{
    /**
     * @description list of links (buttons) to be shown in the context menu
     */
    @Input()
    public links:Array<TerraDataTableContextMenuEntryInterface<D>> = [];

    protected _top:number = 0;
    protected _left:number = 0;

    @ViewChild('list')
    private list:ElementRef;

    private _isShown:boolean = false;
    private readonly clickListener:(event:Event) => void;
    private eventData:{ event:MouseEvent, data:D };

    /**
     * @description constructor
     * @param contextMenuService
     * @param elementRef
     */
    constructor(private contextMenuService:TerraDataTableContextMenuService<D>,
                private elementRef:ElementRef)
    {
        this.clickListener = (event:Event):void =>
        {
            this.clickedOutside(event);
        };
    }

    /**
     * @description initialisation life cycle hook.
     */
    public ngOnInit():void
    {
        window.document.body.appendChild(this.elementRef.nativeElement);

        this.contextMenuService.show.subscribe((eventData:{ event:MouseEvent, data:D }):void =>
        {
            this.eventData = eventData;
            this.isShown = !this.isShown;
        });
    }

    public ngOnDestroy():void
    {
        window.document.body.removeChild(this.elementRef.nativeElement);
    }

    private clickedOutside(event:Event):void
    {
        if(this.eventData.event.target !== event.target)
        {
            this.isShown = false;
        }
    }

    private set isShown(value:boolean)
    {
        if(this._isShown !== value && value)
        {
            document.addEventListener('click', this.clickListener, true);
        }
        else if(this._isShown !== value && !value)
        {
            document.removeEventListener('click', this.clickListener);
        }
        this._isShown = value;
        if(value)
        {
            let mousePosX:number = this.eventData.event.clientX; // left
            let mousePosY:number = this.eventData.event.clientY; // top

            let contextMenuHeight:number = this.list.nativeElement.offsetHeight;
            let contextMenuWidth:number = this.list.nativeElement.offsetWidth;

            let windowHeight:number = window.innerHeight;
            let windowWidth:number = window.innerWidth;

            let isOutsideRight:boolean = mousePosX + contextMenuWidth > windowWidth;
            let isOutsideBottom:boolean = mousePosY + contextMenuHeight > windowHeight;
            let isOutsideRightAndBottom:boolean = isOutsideRight && isOutsideBottom;

            if(isOutsideRightAndBottom)
            {
                this._top = mousePosY - contextMenuHeight;
                this._left = mousePosX - contextMenuWidth;
            }
            else if(isOutsideBottom)
            {
                this._top = mousePosY - contextMenuHeight;
                this._left = mousePosX;
            }
            else if(isOutsideRight)
            {
                this._top = mousePosY;
                this._left = mousePosX - contextMenuWidth;
            }
            else
            {
                this._top = mousePosY;
                this._left = mousePosX;
            }

            this.eventData.event.stopPropagation();
        }
    }

    protected get topAsString():string
    {
        return this._top + 'px';
    }

    protected get leftAsString():string
    {
        return this._left + 'px';
    }

    protected get linksAreSet():boolean
    {
        return !isNullOrUndefined(this.links) && this.links.length > 0;
    }
}
