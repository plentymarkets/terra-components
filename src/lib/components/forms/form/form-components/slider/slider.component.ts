import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraPlacementEnum } from '../../../../../helpers';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-slider',
    templateUrl: './slider.component.html',
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

    /** Amount of digits that will be shown when displaying any values (current value, lower limit, upper limit, ticks) in the slider. */
    @Input()
    public precision: number = null;

    /** If set to true, the upper and lower limits will be displayed. Default is false. */
    @Input()
    public showMinMax: boolean = false;

    /** If set to true, the ticks' label will be displayed. Default is false. */
    @Input()
    public showTicks: boolean = false;

    public _value: number;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: number) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the select element. */
    public writeValue(value: number): void {
        this._value = value;
    }
}
