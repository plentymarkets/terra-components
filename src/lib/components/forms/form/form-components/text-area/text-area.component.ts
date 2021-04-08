import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

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
export class TextAreaComponent implements OnChanges {
    /**
     * @description If true, the textarea is not resizeable. Default false.
     */
    @Input()
    public inputHasFixedHeight: boolean = false;

    /**
     * @description Sets the initial number of rows. Minimum is four.
     */
    @Input()
    public inputMaxRows: number;

    /**
     * @description Set the label.
     */
    @Input()
    public inputName: string;

    /**
     * @description If true, a * indicates that the value is required. Default false.
     */
    @Input()
    public inputIsRequired: boolean;

    /**
     * @description Set the tooltip.
     */
    @Input()
    public inputTooltipText: string;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled: boolean;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     */
    @Input()
    public inputTooltipPlacement: TerraPlacementEnum;

    /**
     * @description Set a maximum number of characters allowed.
     */
    @Input()
    public inputMaxLength: number;

    // The internal data model
    public _innerValue: any;

    public isValid: boolean;

    private readonly _defaultMaxRows: number = 4;

    private _onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.inputMaxRows = this._defaultMaxRows;
        this.isValid = true;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inputMaxRows') && changes?.inputMaxRows) {
            this.inputMaxRows = Math.max(this._defaultMaxRows, changes.inputMaxRows.currentValue);
        }

        if (changes.hasOwnProperty('inputHasFixedHeight')) {
            this.inputHasFixedHeight = !!changes.inputHasFixedHeight.currentValue;
        }
    }

    public get isDisabled(): boolean {
        return this.inputIsDisabled;
    }

    public set isDisabled(value: boolean) {
        this.inputIsDisabled = value;
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
}
