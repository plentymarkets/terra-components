import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextAreaInterface } from './text-area.interface';
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
export class TextAreaComponent implements OnChanges, ControlValueAccessor, TextAreaInterface {
    /**
     * @description If true, the textarea is not resizeable. Default false.
     */
    @Input()
    public hasFixedHeight: boolean = false;

    /**
     * @description Sets the initial number of rows. Minimum is four.
     */
    @Input()
    public maxRows: number;

    /**
     * @description Set the label.
     */
    @Input()
    public name: string;

    /**
     * @description If true, a * indicates that the value is required. Default false.
     */
    @Input()
    public isRequired: boolean = false;

    /**
     * @description Set the tooltip.
     */
    @Input()
    public tooltipText: string;

    /**
     * @description If true, the button will be disabled. Default false.
     */
    @Input()
    public isDisabled: boolean;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     */
    @Input()
    public tooltipPlacement: TerraPlacementEnum;

    /**
     * @description Set a maximum number of characters allowed.
     */
    @Input()
    public maxLength: number;

    public value: string;

    public _onTouchedCallback: () => void = noop;
    public _onChangeCallback: (_: string) => void = noop;

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
    public writeValue(value: string): void {
        this.value = value;
    }

    /** Registers a function called when the control value changes.*/
    public registerOnChange(fn: (_: string) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a function called when the control is touched.*/
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }
}
