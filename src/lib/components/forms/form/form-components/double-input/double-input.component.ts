import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DoubleInputInterface } from './double-input.interface';
import { TerraPlacementEnum, TerraRegex } from '../../../../../helpers';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-double-input',
    templateUrl: './double-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DoubleInputComponent,
            multi: true
        }
    ]
})
export class DoubleInputComponent implements ControlValueAccessor, DoubleInputInterface {
    /** If true, the input will be disabled. Default false. */
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

    /** If true, the value will be right-aligned. Default false. */
    @Input()
    public isPriceInput: boolean = false;

    /** Set the decimal count. Default is 2 (0.01). */
    @Input()
    public set decimalCount(decimalCount: number) {
        this._regex = TerraRegex.getDouble(decimalCount);
        this._step = 1 / Math.pow(10, decimalCount);
    }

    /** The internal data model. */
    public value: number;
    /** Stores the pattern for the validation. */
    public _regex: string;
    /** Stores the step size. */
    public _step: number;

    /** Placeholders for the callbacks which are later provided by the Control Value Accessor. */
    public _onTouchedCallback: () => void = noop;
    public _onChangeCallback: (_: number) => void = noop;

    constructor() {
        // set default value for decimalCount (0.01).
        this.decimalCount = 2;
    }

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: number) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the element. */
    public writeValue(value: number): void {
        this.value = value;
    }
}
