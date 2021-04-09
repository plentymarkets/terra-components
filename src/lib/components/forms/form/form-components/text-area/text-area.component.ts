import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
    // tslint:disable-next-line:no-input-rename
    @Input('inputHasFixedHeight')
    public hasFixedHeight: boolean = false;

    /**
     * @description Sets the initial number of rows. Minimum is four.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputMaxRows')
    public maxRows: number;

    /**
     * @description Set the label.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputName')
    public name: string;

    /**
     * @description If true, a * indicates that the value is required. Default false.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputIsRequired')
    public isRequired: boolean = false;

    /**
     * @description Set the tooltip.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputTooltipText')
    public tooltipText: string;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputIsDisabled')
    public isDisabled: boolean;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputTooltipPlacement')
    public tooltipPlacement: TerraPlacementEnum;

    /**
     * @description Set a maximum number of characters allowed.
     */
    // tslint:disable-next-line:no-input-rename
    @Input('inputMaxLength')
    public maxLength: number;

    @ViewChild(DefaultValueAccessor, { static: true })
    public valueAccessor: DefaultValueAccessor;

    private readonly _defaultMaxRows: number = 4;

    constructor() {
        this.maxRows = this._defaultMaxRows;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('maxRows') && changes?.maxRows) {
            this.maxRows = Math.max(this._defaultMaxRows, changes.inputMaxRows.currentValue);
        }

        if (changes.hasOwnProperty('hasFixedHeight')) {
            this.hasFixedHeight = !!changes.inputHasFixedHeight.currentValue;
        }
    }

    /** Sets the “value” property on the input element.*/
    public writeValue(value: any): void {
        this.valueAccessor.writeValue(value);
    }

    /** Registers a function called when the control value changes.*/
    public registerOnChange(fn: (_: any) => void): void {
        this.valueAccessor.registerOnChange(fn);
    }

    /** Registers a function called when the control is touched.*/
    public registerOnTouched(fn: () => void): void {
        this.valueAccessor.registerOnTouched(fn);
    }

    /** Sets the “disabled” property on the input element.*/
    public setDisabledState(isDisabled: boolean): void {
        this.valueAccessor.setDisabledState(isDisabled);
    }
}
