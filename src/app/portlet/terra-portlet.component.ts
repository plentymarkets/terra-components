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
    selector: 'terra-portlet',
    styles:   [require('./terra-portlet.component.scss')],
    template: require('./terra-portlet.component.html'),
    animations: [
        trigger('collapsedState', [
            state('collapsed', style({
                height: 0,
                'padding-top': 0,
                'padding-bottom': 0
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', [
                animate(100)
            ])
        ])
    ]
})
export class TerraPortletComponent implements OnChanges
{

    @Input() inputPortletHeader:string;

    @Input() isCollapsable: boolean = false;

    @Input() collapsed: boolean = false;

    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private get collapsedState(): string
    {
        if ( !this.isCollapsable )
        {
            return 'expanded';
        }

        if ( this.collapsed )
        {
            return 'collapsed';
        }

        return 'expanded';
    }

    constructor()
    {
    }

    public ngOnChanges( changes: SimpleChanges ): void
    {
        if( changes.hasOwnProperty( "isCollapsable") && !this.isCollapsable )
        {
            this.collapsed = false;
            setTimeout( () => {
                this.collapsedChange.emit( false );
            });
        }
    }

    public toggleCollapse(): void
    {
        this.collapsed = !this.collapsed;

        if ( !this.isCollapsable )
        {
            this.collapsed = false;
        }

        this.collapsedChange.emit( this.collapsed );
    }
}
