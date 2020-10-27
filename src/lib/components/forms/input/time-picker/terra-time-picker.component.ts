/**
 * @author twieder
 */
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { isNullOrUndefined } from 'util';
import { noop } from 'rxjs';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

/** @deprecated since v5. Please use mat-input of type time instead. */
@Component({
    selector: 'terra-time-picker',
    styleUrls: ['./terra-time-picker.component.scss'],
    templateUrl: './terra-time-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraTimePickerComponent,
            multi: true
        }
    ]
})
export class TerraTimePickerComponent implements OnInit, ControlValueAccessor {
    /**
     * @description If true, the input will be disabled. Default false.
     * */
    @Input() public inputIsDisabled: boolean = false; // TODO: This input has no effect on the control!!

    public valuesHours: Array<TerraSelectBoxValueInterface> = [];
    public valuesMinutes: Array<TerraSelectBoxValueInterface> = [];

    private _value: Date = new Date();

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    public ngOnInit(): void {
        this.createTimeValues();
    }

    public createTimeValues(): void {
        let hours: number;
        let minutes: number;

        for (hours = 0; hours <= 23; hours++) {
            this.valuesHours.push({
                value: hours,
                caption: hours
            });
        }

        for (minutes = 0; minutes <= 59; minutes++) {
            this.valuesMinutes.push({
                value: minutes,
                caption: minutes
            });
        }
    }

    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: Date): void {
        this._value = value;
    }

    public get _minutes(): number {
        if (!isNullOrUndefined(this._value)) {
            return this._value.getMinutes();
        }
        return 0;
    }

    public set _minutes(minutes: number) {
        // TODO: if value is null or undefined it is impossible for the user to change the minutes
        if (!isNullOrUndefined(this._value)) {
            this._value.setMinutes(minutes);
        }

        this._onChangeCallback(this._value);
        this._onTouchedCallback();
    }

    public get _hours(): number {
        if (!isNullOrUndefined(this._value)) {
            return this._value.getHours();
        }
        return 0;
    }

    public set _hours(minutes: number) {
        // TODO: if value is null or undefined it is impossible for the user to change the hours
        if (!isNullOrUndefined(this._value)) {
            this._value.setHours(minutes);
        }

        this._onChangeCallback(this._value);
        this._onTouchedCallback();
    }
}
