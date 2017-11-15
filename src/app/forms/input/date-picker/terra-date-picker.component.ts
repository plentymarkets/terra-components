import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    ViewChild
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
    IMyDateModel,
    IMyOptions,
    MyDatePicker
} from 'mydatepicker';
import moment = require('moment');

/**
 * @author mfrank
 */
@Component({
    selector:  'terra-date-picker',
    styles:    [
        require('./terra-date-picker.component.scss'),
        require('./terra-date-picker.component.glob.scss').toString()
    ],
    template:  require('./terra-date-picker.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraDatePickerComponent),
            multi:       true
        }
    ]
})
export class TerraDatePickerComponent implements OnChanges, ControlValueAccessor
{
    /**
     * @description Set the label.
     * */
    @Input() inputName:string;
    /**
     * @description If true, a * indicates that the value is required. Default false.
     * */
    @Input() inputIsRequired:boolean;
    /**
     * @description If false, the input will appear with a red border to indicate that the entered value is not valid. Default true.
     * */
    @Input() inputIsValid:boolean;
    /**
     * @description If true, the input will be disabled. Default false.
     * */
    @Input() inputIsDisabled:boolean;
    /**
     * @description If true, the calendar will be opened on top. Default false.
     * */
    @Input() inputOpenCalendarTop:boolean;
    /**
     * @description Set the date format. Default 'dd.mm.yyyy'.
     * */
    @Input() inputDisplayDateFormat:string;

    @ViewChild('viewChildMyDatePicker') viewChildMyDatePicker:MyDatePicker;

    private _value:IMyDateModel;
    private _myDateModel:IMyDateModel;
    private _currentLocale:string;
    private _datePickerOptions:IMyOptions;

    constructor()
    {
        this.inputIsRequired = false;
        this.inputIsDisabled = false;
        this.inputIsValid = true;
        this.inputOpenCalendarTop = false;
        this.inputDisplayDateFormat = 'dd.mm.yyyy';

        this._currentLocale = localStorage.getItem('plentymarkets_lang_');
    }

    ngOnChanges()
    {
        this.updateDatePickerOptions();
    }

    private updateDatePickerOptions():void
    {
        this._datePickerOptions = {
            height:                   'inherit',
            componentDisabled:        this.inputIsDisabled,
            openSelectorTopOfInput:   this.inputOpenCalendarTop,
            showSelectorArrow:        !this.inputOpenCalendarTop,
            inline:                   false,
            editableDateField:        true,
            openSelectorOnInputClick: false,
            dateFormat:               this.inputDisplayDateFormat,
        };
    }

    private onTouchedCallback:() => void = () =>
    {
    };

    private onChangeCallback:(_:any) => void = (_) =>
    {
    };

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public writeValue(value:any):void
    {
        if(value != null && value !== undefined && typeof (value) === "string" && isNaN(Date.parse(value)) === false)
        {
            let newDate = new Date(value);

            this.value = {
                date:      {
                    year:  newDate.getFullYear(),
                    month: newDate.getMonth() + 1,
                    day:   newDate.getDate()
                },
                jsdate:    newDate,
                formatted: null,
                epoc:      null
            };
        }
    }

    public get value():IMyDateModel
    {
        return this._value;
    }

    public set value(value:IMyDateModel)
    {
        if(value != null && value !== undefined && typeof(value) === "object")
        {
            this._value = value;

            this.onTouchedCallback();
            this.onChangeCallback(moment(value.jsdate).format());
        }
        else
        {
            this._value = null;

            this.onTouchedCallback();
            this.onChangeCallback(null);
        }
    }

    public clearDate():void
    {
        this.viewChildMyDatePicker.clearDate();
    }
}
