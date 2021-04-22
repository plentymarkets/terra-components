import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { noop } from 'rxjs';
import { TerraPlacementEnum } from 'src/lib/helpers/enums/terra-placement.enum';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    selector: 'tc-datepicker',
    templateUrl: './datepicker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DatePickerComponent,
            multi: true
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
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

    @Input()
    public displayDateFormat: string;

    /** @description The internal data model */
    public value: any = moment();

    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;

    constructor(
        private _adapter: DateAdapter<MomentDateAdapter>,
        @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats
    ) {
        // this._adapter.setLocale('DE-de');

        dateFormats.display = {
            dateInput: 'DD-MM-YYYY',
            monthYearLabel: 'YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY'
        };
    }

    public ngOnInit(): void {
        if (this.displayDateFormat) {
            this.dateFormats.display.dateInput = this.displayDateFormat;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['displayDateFormat']) {
            this.dateFormats.display.dateInput = this.displayDateFormat;
        }
    }

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: string): void {
        if (value) {
            this.value = moment(value);
        }
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }
}
