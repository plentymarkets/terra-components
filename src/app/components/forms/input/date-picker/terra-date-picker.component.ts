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
import { isNullOrUndefined } from 'util';
import moment = require('moment');

let nextId:number = 0;

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
     */
    @Input()
    public inputName:string;

    /**
     * @description If true, a * indicates that the value is required. Default false.
     */
    @Input()
    public inputIsRequired:boolean;

    /**
     * @description If false, the input will appear with a red border to indicate that the entered value is not valid. Default true.
     */
    @Input()
    public inputIsValid:boolean;

    /**
     * @description If true, the input will be disabled. Default false.
     */
    @Input()
    public inputIsDisabled:boolean;

    /**
     * @description If true, the calendar will be opened on top. Default false.
     */
    @Input()
    public inputOpenCalendarTop:boolean;

    /**
     * @description Set the date format. Default 'dd.mm.yyyy'.
     */
    @Input()
    public inputDisplayDateFormat:string;

    @ViewChild('viewChildMyDatePicker') public viewChildMyDatePicker:MyDatePicker;

    /**
     * @description a unique string identifier for the specific input instance.
     */

    protected currentLocale:string;
    protected id:string;
    protected datePickerOptions:IMyOptions;
    protected helperTooltip:string;
    protected isHelperTooltipDisabled:boolean;

    private _value:IMyDateModel;

    constructor()
    {
        this.inputIsRequired = false;
        this.inputIsDisabled = false;
        this.inputIsValid = true;
        this.inputOpenCalendarTop = false;
        this.inputDisplayDateFormat = 'dd.mm.yyyy';

        this.currentLocale = localStorage.getItem('plentymarkets_lang_');

        // generate the id of the input instance
        this.id = `date-picker_#${nextId++}`;
    }

    public ngOnChanges():void
    {
        this.updateDatePickerOptions();
    }

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
        if(!isNullOrUndefined(value) && typeof (value) === 'string' && isNaN(Date.parse(value)) === false)
        {
            let newDate:Date = new Date(value);

            this._value = {
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
        else
        {
            this.clearDate();
        }
    }

    public get value():IMyDateModel
    {
        return this._value;
    }

    public set value(value:IMyDateModel)
    {
        if(!isNullOrUndefined(value) && typeof (value) === 'object')
        {
            this._value = value;
        }
        else
        {
            this._value = null;
        }
    }

    public clearDate():void
    {
        this.viewChildMyDatePicker.clearDate();
    }

    private updateDatePickerOptions():void
    {
        this.datePickerOptions = {
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
        /* */
    }

    private onChangeCallback:(_:any) => void = (_) =>
    {
        /* */
    }
}
