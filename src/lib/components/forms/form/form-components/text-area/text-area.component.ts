import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { TextAreaInterface } from './text-area.interface';

@Component({
    selector: 'terra-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextAreaComponent,
            multi: true
        }
    ]
})
export class TextAreaComponent implements OnChanges, ControlValueAccessor, TextAreaInterface {
    /**
     * @description If true, the textarea is not resizeable. Default false.
     */
    @Input('inputHasFixedHeight')
    public hasFixedHeight: boolean = false;

    /**
     * @description Sets the initial number of rows. Minimum is four.
     */
    @Input('inputMaxRows')
    public maxRows: number;

    /**
     * @description Set the label.
     */
    @Input('inputName')
    public name: string;

    /**
     * @description If true, a * indicates that the value is required. Default false.
     */
    @Input('inputIsRequired')
    public isRequired: boolean;

    /**
     * @description Set the tooltip.
     */
    @Input('inputTooltipText')
    public tooltipText: string;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input('inputIsDisabled')
    public isDisabled: boolean;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     */
    @Input('inputTooltipPlacement')
    public tooltipPlacement: TerraPlacementEnum;

    /**
     * @description Set a maximum number of characters allowed.
     */
    @Input('inputMaxLength')
    public maxLength: number;

    // The internal data model
    public _innerValue: any;

    public isValid: boolean;

    private readonly _defaultMaxRows: number = 4;

    private _onTouchedCallback: (_: any) => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.maxRows = this._defaultMaxRows;
        this.isValid = true;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('maxRows') && changes?.inputMaxRows) {
            this.maxRows = Math.max(this._defaultMaxRows, changes.inputMaxRows.currentValue);
        }

        if (changes.hasOwnProperty('hasFixedHeight')) {
            this.hasFixedHeight = !!changes.inputHasFixedHeight.currentValue;
        }
    }

    // get accessor
    public get value(): any {
        return this._innerValue;
    }

    // set accessor including call the onchange callback
    public set value(v: any) {
        if (v !== this._innerValue) {
            this._innerValue = v;
            this._onChangeCallback(this._innerValue);
        }
    }

    // From ControlValueAccessor interface
    public writeValue(value: any): void {
        if (value !== this._innerValue) {
            this._innerValue = value;
        }
    }

    public validate(formControl: FormControl): void {
        if (formControl.valid) {
            this.isValid = true;
        } else {
            if (!this.isDisabled) {
                this.isValid = false;
            }
        }
    }

    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }
}
