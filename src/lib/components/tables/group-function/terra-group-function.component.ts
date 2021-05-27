import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

@Component({
    selector: 'terra-group-function',
    templateUrl: './terra-group-function.component.html',
    styleUrls: ['./terra-group-function.component.scss'],
    animations: [
        trigger('collapsedState', [
            state(
                'hidden',
                style({
                    height: '0',
                    overflow: 'hidden',
                    'margin-bottom': '0'
                })
            ),
            state(
                'collapsed',
                style({
                    height: '*',
                    overflow: 'initial',
                    'margin-bottom': '6px'
                })
            ),
            transition('hidden <=> collapsed', [animate(300)])
        ])
    ]
})
/** @deprecated since v11. */
export class TerraGroupFunctionComponent {
    /**
     * @description shows group functions container if set to true
     * @default false
     */
    @Input()
    public show: boolean = false;
    /**
     * @description disables execute group function button
     * @default true
     */
    @Input()
    public disableExecution: boolean = true;

    /**
     * @description emits if the execute group functions button has been clicked
     */
    @Output()
    public executeGroupFunction: EventEmitter<void> = new EventEmitter();

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    public get _collapsedState(): string {
        return this.show ? 'collapsed' : 'hidden';
    }
}
