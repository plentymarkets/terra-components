import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import { noop } from 'rxjs';

let nextId: number = 0;

/** @deprecated since v5. Use angular material's [checkbox](https://material.angular.io/components/checkbox/overview) instead. */
@Component({
    selector: 'terra-checkbox',
    styleUrls: ['./terra-checkbox.component.scss'],
    templateUrl: './terra-checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraCheckboxComponent,
            multi: true
        }
    ]
})
export class TerraCheckboxComponent implements ControlValueAccessor {
    /**
     * @description If true, the check box will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled: boolean;

    /**
     * @description Set the caption.
     */
    @Input()
    public inputCaption: string;

    /**
     * @description Set an icon (e.g. icon-save).
     */
    @Input()
    public inputIcon: string;

    /** @description Set the tooltip.*/
    @Input()
    public tooltipText: string;

    /**
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** @deprecated Temporarily for {@see TerraCheckboxTreeComponent}*/
    @Input()
    public notifyOnChanges: boolean;

    /**
     * @description Set accessor for the indeterminate state of the checkbox
     * @param value
     */
    @Input()
    public set isIndeterminate(value: boolean) {
        if (value) {
            this._innerValue = null;
        }
        this._isIndeterminate = value;
    }

    /**
     * @description get accessor for indeterminate state of the checkbox
     */
    public get isIndeterminate(): boolean {
        return this._isIndeterminate;
    }

    /**
     * @description Emits the current isIndeterminate state when it has changed.
     */
    @Output()
    public isIndeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isValid: boolean = true;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    public _id: string;
    public _isIndeterminate: boolean = false;

    // The internal data model
    public _innerValue: boolean = false;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (value: any) => void = noop;

    constructor() {
        // generate the id of the input instance
        this._id = `checkbox_#${nextId++}`;
    }

    /**
     * @description Notifies a consumer via `ngModelChange` with the given value.
     * Is called whenever the value of the checkbox changes.
     * @param value
     */
    public onChange(value: boolean): void {
        this._onChangeCallback(value);
        this._updateIntermediateState(false);
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Updates the _innerValue of the checkbox based on the given value.
     * @param value
     */
    public writeValue(value: boolean): void {
        if (value !== this._innerValue) {
            if (value === null || value === undefined) {
                value = false;
            }

            this._updateIntermediateState(false);
            this._innerValue = value;

            if (this.notifyOnChanges) {
                this._onChangeCallback(value);
            }
        }
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Registers a given callback method, which will be called whenever the value of the checkbox changes.
     * @param fn
     */
    public registerOnChange(fn: (value: any) => void): void {
        this._onChangeCallback = fn;
    }

    /**
     * Part of the implementation of the ControlValueAccessor interface
     * @description Registers a given callback method, which will be called whenever the checkbox has been touched.
     * @param fn
     */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    private _updateIntermediateState(newState: boolean): void {
        this._isIndeterminate = newState;
        this.isIndeterminateChange.emit(this.isIndeterminate);
    }
}
