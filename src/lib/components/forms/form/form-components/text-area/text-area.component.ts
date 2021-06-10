import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextAreaInterface } from './text-area.interface';
import { noop } from 'rxjs';

@Component({
    selector: 'tc-text-area',
    templateUrl: './text-area.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextAreaComponent,
            multi: true
        }
    ]
})
export class TextAreaComponent implements ControlValueAccessor, TextAreaInterface {
    /** If true, the textarea is not resizeable. Default false. */
    @Input()
    public hasFixedHeight: boolean = false;

    /** Sets the initial number of rows. Minimum is four. */
    @Input()
    public set maxRows(rows: number) {
        this._maxRows = Math.max(this._defaultMaxRows, rows);
    }

    /** Set the label. */
    @Input()
    public name: string;

    /** If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** Set the tooltip. */
    @Input()
    public tooltipText: string;

    /** If true, the button will be disabled. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** Set a maximum number of characters allowed. */
    @Input()
    public maxLength: number;

    /** Internal model. The value of the input. */
    public value: string;
    public _maxRows: number;

    /** Stores a callback function which is executed whenever the input was blurred. */
    public _onTouchedCallback: () => void = noop;
    /** Stores a callback function which is executed whenever the value of the input changes. */
    public _onChangeCallback: (_: string) => void = noop;

    private readonly _defaultMaxRows: number = 4;

    constructor() {
        this.maxRows = this._defaultMaxRows;
    }

    /** Writes a new value to the element.*/
    public writeValue(value: string): void {
        this.value = value;
    }

    /** Registers a callback function that is called when the control's value changes in the UI.*/
    public registerOnChange(fn: (_: string) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur.*/
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }
}
