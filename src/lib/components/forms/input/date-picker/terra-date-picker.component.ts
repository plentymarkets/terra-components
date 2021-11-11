import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMyDateModel, IMyInputFocusBlur, IMyOptions, MyDatePicker } from 'mydatepicker';
import { isNullOrUndefined } from 'util';
import * as moment_ from 'moment';
// tslint:disable-next-line:typedef
const moment = moment_;

let nextId: number = 0;

/**
 * @author mfrank
 * @deprecated since v5. Use {@link https://material.angular.io/components/datepicker/overview} instead.
 */
@Component({
    selector: 'terra-date-picker',
    templateUrl: './terra-date-picker.component.html',
    styleUrls: ['./terra-date-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraDatePickerComponent,
            multi: true
        }
    ]
})
export class TerraDatePickerComponent implements OnChanges, ControlValueAccessor {
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
     * @description If false, the input will appear with a red border to indicate that the entered value is not valid. Default true.
     */
    @Input()
    public inputIsValid: boolean;

    /**
     * @description If true, the input will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled: boolean;

    /**
     * @description If true, the calendar will be opened on top. Default false.
     */
    @Input()
    public inputOpenCalendarTop: boolean;

    /**
     * @description Set the date format. Default 'dd.mm.yyyy'.
     */
    @Input()
    public inputDisplayDateFormat: string;

    @ViewChild('viewChildMyDatePicker', { static: true }) public viewChildMyDatePicker: MyDatePicker;

    /**
     * @description a unique string identifier for the specific input instance.
     */

    public _currentLocale: string;
    public _id: string;
    public _datePickerOptions: IMyOptions;
    public _dateAsString: string;

    private _value: IMyDateModel;

    constructor() {
        this.inputIsRequired = false;
        this.inputIsDisabled = false;
        this.inputIsValid = true;
        this.inputOpenCalendarTop = false;
        this.inputDisplayDateFormat = 'dd.mm.yyyy';

        this._currentLocale = localStorage.getItem('plentymarkets_lang_');

        // generate the id of the input instance
        this._id = `date-picker_#${nextId++}`;
    }

    public ngOnChanges(): void {
        this.updateDatePickerOptions();
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    public writeValue(value: any): void {
        if (!isNullOrUndefined(value) && typeof value === 'string' && isNaN(Date.parse(value)) === false) {
            let newDate: Date = new Date(value);

            this.value = {
                date: {
                    year: newDate.getFullYear(),
                    month: newDate.getMonth() + 1,
                    day: newDate.getDate()
                },
                jsdate: newDate,
                formatted: null,
                epoc: null
            };
        } else {
            this.clearDate();
        }
    }

    public get value(): IMyDateModel {
        return this._value;
    }

    public set value(value: IMyDateModel) {
        if (!isNullOrUndefined(value) && typeof value === 'object') {
            this._value = value;
        } else {
            this._value = null;
        }

        if (this.viewChildMyDatePicker && this.viewChildMyDatePicker.inputBoxEl) {
            this._dateAsString = this.viewChildMyDatePicker.inputBoxEl.nativeElement.value;
        }
    }

    public clearDate(): void {
        this.viewChildMyDatePicker.clearDate();
    }

    /**
     * Is triggered on `ngModelChange` and executes `onChangeCallBack`
     * @param value
     */
    public _onChange(value: IMyDateModel): void {
        if (!isNullOrUndefined(value)) {
            this.onChangeCallback(moment(value.jsdate).format());
        } else {
            this.onChangeCallback(null);
        }
    }

    /**
     * Is triggered on `inputFocusBlur` and executes `onTouchedCallback` if a blur event is emitted
     * @param event
     */
    public _onFocusOrBlur(event: IMyInputFocusBlur): void {
        if (event.reason === 2) {
            // blur
            this.onTouchedCallback();
        }
    }

    private updateDatePickerOptions(): void {
        this._datePickerOptions = {
            height: 'inherit',
            componentDisabled: this.inputIsDisabled,
            openSelectorTopOfInput: this.inputOpenCalendarTop,
            showSelectorArrow: !this.inputOpenCalendarTop,
            inline: false,
            editableDateField: true,
            openSelectorOnInputClick: false,
            dateFormat: this.inputDisplayDateFormat
        };
    }

    private onTouchedCallback: () => void = () => {
        /* */
    };

    private onChangeCallback: (_: any) => void = (_: any) => {
        /* */
    };
}
