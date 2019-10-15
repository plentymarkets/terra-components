import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { Language } from 'angular-l10n';

@Component({
    selector:    'terra-group-function',
    templateUrl: './terra-group-function.component.html',
    styleUrls:   ['./terra-group-function.component.scss'],
    animations:  [
        trigger('collapsedState', [
            state('hidden', style({
                height:          '0',
                overflow:        'hidden',
                'margin-bottom': '0'
            })),
            state('collapsed', style({
                height:          '*',
                overflow:        'initial',
                'margin-bottom': '6px'
            })),
            transition('hidden <=> collapsed', [
                animate(300)
            ])
        ])
    ]
})
export class TerraGroupFunctionComponent implements OnInit, OnDestroy
{
    /**
     * @description shows group functions container if set to true
     * @default false
     */
    @Input()
    public show:boolean = false;
    /**
     * @description disables execute group function button
     * @default true
     */
    @Input()
    public disableExecution:boolean = true;

    /**
     * @description emits if the execute group functions button has been clicked
     */
    @Output()
    public executeGroupFunction:EventEmitter<void> = new EventEmitter();

    /**
     * @description currently selected language
     */
    @Language()
    public _lang:string;

    public ngOnInit():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnDestroy():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public get _collapsedState():string
    {
        return this.show ? 'collapsed' : 'hidden';
    }
}
