import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { noop } from 'rxjs';
import { TerraPlacementEnum } from 'src/lib/helpers/enums/terra-placement.enum';

@Component({
    selector: 'tc-datepicker',
    templateUrl: './datepicker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DatePickerComponent,
            multi: true
        },
        {
            provide: MAT_NATIVE_DATE_FORMATS,
            useValue: {useUtc: true}
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor {
    /** Disables the input when set to true. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** Requires the input to be filled when set to true. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** The name of the control which will be used as label. */
    @Input()
    public name: string = '';

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** Text that should be shown in a tooltip on the control. */
    @Input()
    public tooltipText: string;

    public value:any;

    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;

    constructor() {}

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: any): void {
        this.value = value;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }
}
