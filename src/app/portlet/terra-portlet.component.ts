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
} from "@angular/animations";

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

    @Input() inputPortletHeader:string;

    @Input() inputIsCollapsable:boolean = false;

    @Input() inputCollapsed:boolean = false;

    @Output() inputCollapsedChange:EventEmitter<boolean> = new EventEmitter<boolean>();

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
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty("inputIsCollapsable") && !this.inputIsCollapsable)
        {
            this.inputCollapsed = false;
            setTimeout(() =>
            {
                this.inputCollapsedChange.emit(false);
            });
        }
    }

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
