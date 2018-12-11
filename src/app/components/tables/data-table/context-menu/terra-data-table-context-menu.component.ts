import {
    Component,
    Input,
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
    /**
     * @description list of links (buttons) to be shown in the context menu
     */
    @Input()
    public links:Array<TerraDataTableContextMenuEntryInterface<D>> = [];

    protected top:number = 0;
    protected left:number = 0;

    private _isShown:boolean = false;
    private readonly clickListener:(event:Event) => void;
    private eventData:{ event:MouseEvent, data:D };

    /**
     * @description constructor
     * @param contextMenuService
     */
    constructor(private contextMenuService:TerraDataTableContextMenuService<D>)
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
        this.contextMenuService.show.subscribe((eventData:{ event:MouseEvent, data:D }):void =>
        {
            this.eventData = eventData;
            this.isShown = !this.isShown;
        });
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

        if(value)
        {
            this.top = this.eventData.event.clientY + window.scrollY;
            this.left = this.eventData.event.clientX + window.scrollX;

            this.eventData.event.stopPropagation();
        }

        this._isShown = value;
    }
}
