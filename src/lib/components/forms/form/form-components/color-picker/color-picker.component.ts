import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { noop } from 'rxjs';
import { TerraPlacementEnum } from '../../../../../helpers';

@Component({
    selector: 'color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ColorPickerComponent,
            multi: true
        }
    ]
})
export class ColorPickerComponent implements ControlValueAccessor, TerraFormComponentBaseInterface {
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

    public get color(): string {
        return this.value || '#ffffff';
    }

    public set color(c: string) {
        this.value = c;
    }

    /** @description The internal data model */
    public value: string;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: any): void {}
}
