import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Inject, Input } from '@angular/core';
import { noop } from 'rxjs';
import { TerraPlacementEnum } from 'src/lib/helpers/enums/terra-placement.enum';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';
import { DatepickerInterface } from './datepicker.interface';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import * as moment from 'moment';
import { isMoment, Moment } from 'moment';

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
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {
            provide: MAT_DATE_LOCALE,
            useFactory: (locale: L10nLocale) => locale.language,
            deps: [L10N_LOCALE]
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_MOMENT_DATE_FORMATS
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor, DatepickerInterface {
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
    public tooltipText: string = '';

    /** Specifies the display format of the datepicker */
    @Input()
    public set displayDateFormat(value: string) {
        this.dateFormats.display.dateInput = value;
    }

    /** @description The internal data model */
    public value: Moment;

    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;

    constructor(@Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats) {}

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: string) => void): void {
        this._onChangeCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: string): void {
        this.value = moment(value ?? '');
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    public _onChange(date: Moment | null): void {
        this._onChangeCallback(isMoment(date) ? date.format() : null);
    }
}
