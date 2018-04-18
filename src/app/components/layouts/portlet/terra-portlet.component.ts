import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { isNullOrUndefined } from 'util';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

@Component({
    selector:   'terra-portlet',
    styles:     [require('./terra-portlet.component.scss')],
    template:   require('./terra-portlet.component.html'),
    animations: [
        trigger('collapsedState', [
            state('inputCollapsed', style({
                height:           0,
                'padding-top':    0,
                'padding-bottom': 0
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('inputCollapsed <=> expanded', [
                animate(100)
            ])
        ])
    ]
})
export class TerraPortletComponent implements OnChanges
{
    /**
     * @description If true, portlet gets highlighted on mouse hover.
     */
    @Input()
    public inputHighlightPortlet:boolean = false;

    /**
     * @description Sets the label of the portlet header.
     */
    @Input()
    public inputPortletHeader:string;

    /**
     * @description If true, the portlet gets collapsable.
     */
    @Input()
    public inputIsCollapsable:boolean = false;

    /**
     * @description If true, the portlet is collapsed (requires inputIsCollapsable = true).
     */
    @Input()
    public inputCollapsed:boolean = false;

    /**
     * @description Sets the given buttons as a button group to the right side of the portlet header.
     */
    @Input()
    public inputButtonList:Array<TerraButtonInterface> = [];

    @Output()
    public inputCollapsedChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    private get collapsedState():string
    {
        if(!this.inputIsCollapsable)
        {
            return 'expanded';
        }

        if(this.inputCollapsed)
        {
            return 'inputCollapsed';
        }

        return 'expanded';
    }

    constructor()
    {
        this.inputPortletHeader = isNullOrUndefined(this.inputPortletHeader) ? '' : this.inputPortletHeader;
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputIsCollapsable') && !this.inputIsCollapsable)
        {
            this.inputCollapsed = false;
            setTimeout(() =>
            {
                this.inputCollapsedChange.emit(false);
            });
        }
    }

    /**
     * @description Changes the collapse state.
     */
    public toggleCollapse():void
    {
        this.inputCollapsed = !this.inputCollapsed;

        if(!this.inputIsCollapsable)
        {
            this.inputCollapsed = false;
        }

        this.inputCollapsedChange.emit(this.inputCollapsed);
    }
}
