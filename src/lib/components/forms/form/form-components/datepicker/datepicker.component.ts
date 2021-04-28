import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Inject, Input } from '@angular/core';
import { noop } from 'rxjs';
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
import { TerraPlacementEnum } from '../../../../../helpers';
import * as cloneDeep from 'lodash.clonedeep';

/**
 * Determines the language specified by angular-l10n's current locale which will be used as the locale for material's date picker.
 * @params locale angular-l10n's locale
 * @returns {string} The language specified by angular-l10n's current locale.
 */
export function matDateLocaleFactory(locale: L10nLocale): string {
    return locale.language;
}

/**
 * Creates a deep clone of @angular/material-moment-adapter's `MAT_MOMENT_DATE_FORMATS`.
 * @returns {MatDateFormats} The date formats to be used by the datepicker.
 */
export function matDateFormatsFactory(): MatDateFormats {
    return cloneDeep(MAT_MOMENT_DATE_FORMATS);
}

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
            useFactory: matDateLocaleFactory,
            deps: [L10N_LOCALE]
        },
        {
            provide: MAT_DATE_FORMATS,
            useFactory: matDateFormatsFactory
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

    /** Sets the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    /** Text that should be shown in a tooltip on the control. */
    @Input()
    public tooltipText: string = '';

    /** Specifies the display format of the date picker. */
    @Input()
    public set displayDateFormat(value: string) {
        this.dateFormats.display.dateInput = value;
    }

    /** @description The internal data model */
    public value: Moment | null = null;

    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: string) => void = noop;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;

    constructor(@Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats) {}

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: string) => void): void {
        this._onChangeCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: string): void {
        this.value = value ? moment(value) : null;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /**
     * Calls registered {@link _onChangeCallback} whenever the control's value changes in the UI.
     * The control's value is represented as ISO 8601 compliant date string.
     * @see {@link https://momentjs.com/docs/#/displaying/format/} for further details.
     */
    public _onChange(date: Moment | null): void {
        this._onChangeCallback(isMoment(date) ? date.format() : null);
    }
}
