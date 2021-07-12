import { Component, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraPlacementEnum } from '../../../../../helpers';
import { noop } from 'rxjs';
import { getNumberOfFractionalDigits } from './utils/fractional-digits';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';

@Component({
    selector: 'tc-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SliderComponent,
            multi: true
        }
    ]
})
export class SliderComponent implements ControlValueAccessor {
    /** If true, the slider will be disabled. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** Set the label. */
    @Input()
    public name: string = '';

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** Set the tooltip. */
    @Input()
    public tooltipText: string = '';

    /** Lower limit of the slider. Default is 0. */
    @Input()
    public min: number = 0;

    /** Upper limit of the slider. Default is 1. */
    @Input()
    public max: number = 1;

    /** Step size of the slider. Default is 0. */
    @Input()
    public interval: number = 0;

    /** Number of fractional digits that will be shown when displaying the current value of the slider. Default is null. */
    @Input()
    public precision: number = null;

    /** If set to true, the upper and lower limits will be displayed. Default is false. */
    @Input()
    public showMinMax: boolean = false;

    /** If set to true, the ticks will be displayed. Default is false. */
    @Input()
    public showTicks: boolean = false;

    /** The internal data model. */
    public value: number;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: number) => void = noop;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    /** A function that formats the display value according to the given precision. */
    public _precisionDisplayFn: (value: number) => string = (value: number) => {
        const precision: number = this.precision || getNumberOfFractionalDigits(this.interval);
        return value.toFixed(Math.min(precision, 3));
    };

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: number) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the slider element. */
    public writeValue(value: number): void {
        this.value = value;
    }
}
