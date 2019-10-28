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
    selector:    'context-menu', // it still exists a terra-context-menu in terra, need to refactored first
    styleUrls:   ['./terra-data-table-context-menu.component.scss'],
    templateUrl: './terra-data-table-context-menu.component.html'
})
export class TerraDataTableContextMenuComponent<D extends TerraBaseData> implements OnInit, OnDestroy
{
    /**
     * @description list of links (buttons) to be shown in the context menu
     */
    @Input()
    public links:Array<TerraDataTableContextMenuEntryInterface<D>> = [];

    public _eventData:{ event:MouseEvent, data:D };

    protected _top:number = 0;
    protected _left:number = 0;

    // tslint:disable-next-line:variable-name
    private __isShown:boolean = false;

    @ViewChild('list')
    private list:ElementRef;

    private readonly clickListener:(event:Event) => void;

    constructor(private _contextMenuService:TerraDataTableContextMenuService<D>,
                private _elementRef:ElementRef)
    {
        this.clickListener = (event:Event):void =>
        {
            this._clickedOutside(event);
        };
    }

    /**
     * @description initialisation life cycle hook.
     */
    public ngOnInit():void
    {
        this._contextMenuService.show.subscribe((eventData:{ event:MouseEvent, data:D }):void =>
        {
            this._eventData = eventData;
            this._isShown = !this._isShown;
        });
    }

    public ngOnDestroy():void
    {
        if(this.__isShown)
        {
            window.document.body.removeChild(this._elementRef.nativeElement);
        }
    }

    private _clickedOutside(event:Event):void
    {
        if(this._eventData.event.target !== event.target)
        {
            this._isShown = false;
        }
    }

    public set _isShown(value:boolean)
    {
        if(this.__isShown !== value && value)
        {
            window.document.body.appendChild(this._elementRef.nativeElement);
            document.addEventListener('click', this.clickListener, true);
        }
        else if(this.__isShown !== value && !value)
        {
            window.document.body.removeChild(this._elementRef.nativeElement);
            document.removeEventListener('click', this.clickListener);
        }
        this.__isShown = value;
        if(value)
        {
            let mousePosX:number = this._eventData.event.clientX; // left
            let mousePosY:number = this._eventData.event.clientY; // top

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

            this._eventData.event.stopPropagation();
        }
    }

    public get _isShown():boolean
    {
        return this.__isShown;
    }

    public get _topAsString():string
    {
        return this._top + 'px';
    }

    public get _leftAsString():string
    {
        return this._left + 'px';
    }

    public get _linksAreSet():boolean
    {
        return !isNullOrUndefined(this.links) && this.links.length > 0;
    }
}
