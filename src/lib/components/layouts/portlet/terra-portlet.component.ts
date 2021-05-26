import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-portlet',
    styleUrls: ['./terra-portlet.component.scss'],
    templateUrl: './terra-portlet.component.html',
    animations: [
        trigger('collapsedState', [
            state(
                'collapsed',
                style({
                    height: 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                })
            ),
            state(
                'expanded',
                style({
                    height: '*'
                })
            ),
            transition('collapsed <=> expanded', [animate(100)])
        ])
    ]
})
/** @deprecated since v11. Please use angular material's [expansion panel](https://material.angular.io/components/expansion/overview) instead. */
export class TerraPortletComponent implements OnChanges {
    /**
     * @description If true, portlet gets highlighted on mouse hover.
     */
    @Input()
    public inputHighlightPortlet: boolean = false;

    /**
     * @description Sets the label of the portlet header.
     */
    @Input()
    public inputPortletHeader: string;

    /**
     * @description If true, the portlet gets collapsable.
     */
    @Input()
    public inputIsCollapsable: boolean = false;

    /**
     * @description If true, the portlet is collapsed (requires inputIsCollapsable = true).
     */
    @Input()
    public inputCollapsed: boolean = false;

    /**
     * @description Sets the given buttons as a button group to the right side of the portlet header.
     */
    @Input()
    public inputButtonList: Array<TerraButtonInterface> = [];

    @Input()
    public inputIsDisabled: boolean = false;
    /**
     * @description Sets an info text which is rendered in a terra-info
     */
    @Input()
    public infoText: string;

    @Output()
    public inputCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public readonly _infoTextPlacement: TerraPlacementEnum = TerraPlacementEnum.RIGHT;

    public get _collapsedState(): string {
        if (!this.inputIsCollapsable) {
            return 'expanded';
        }

        if (this.inputCollapsed) {
            return 'collapsed';
        }

        return 'expanded';
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputIsCollapsable') && !this.inputIsCollapsable) {
            this.inputCollapsed = false;
            setTimeout(() => {
                this.inputCollapsedChange.emit(false);
            });
        }
    }

    /**
     * @description Changes the collapse state.
     */
    public toggleCollapse(): void {
        if (!this.inputIsDisabled) {
            if (!this.inputIsCollapsable) {
                this.inputCollapsed = false;
                return;
            }
            this.inputCollapsed = !this.inputCollapsed;
            this.inputCollapsedChange.emit(this.inputCollapsed);
        }
    }
}
