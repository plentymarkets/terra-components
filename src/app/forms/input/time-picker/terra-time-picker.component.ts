/**
 * @author twieder
 */
import {
    Component,
    forwardRef,
    Input,
    OnInit,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraSelectBoxValueInterface } from '../../../components/forms/select-box/data/terra-select-box.interface';

export enum TimeFormat
{
    EUROPEAN = '24',
    AMERICAN = '12'
}

export enum DayFormat
{
    AM = 'AM',
    PM = 'PM'
}

@Component({
    selector:  'terra-time-picker',
    styles:    [
        require('./terra-time-picker.component.scss'),
    ],
    template:  require('./terra-time-picker.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraTimePickerComponent),
            multi:       true
        }
    ]
})

export class TerraTimePickerComponent implements OnInit, ControlValueAccessor
{
    /**
     * @description If true, the input will be disabled. Default false.
     * */
    @Input() public inputIsDisabled:boolean;


    public _selectedMinute:TerraSelectBoxValueInterface;
    public _selectedHour:TerraSelectBoxValueInterface;
    public _valueFormat:TimeFormat;
    public _valuePMAM:DayFormat;
    public _values24:Array<TerraSelectBoxValueInterface> = [];
    public _values12:Array<TerraSelectBoxValueInterface> = [];
    public _valueHours:Array<TerraSelectBoxValueInterface> = [];
    public _valuesMinutes:Array<TerraSelectBoxValueInterface> = [];
    public _is24HourFormat:boolean = true;
    public _timeFormatEnum:any = TimeFormat;
    public _dayFormatEnum:any = DayFormat;
    private _value:Date;

    constructor()
    {
        this.inputIsDisabled = false;
    }

    public ngOnInit():void
    {

        this.createTimeValues();
    }

    public createTimeValues():void
    {
        let hours:number;
        let minutes:number;

        for(hours = 0; hours <= 23; hours++)
        {
            this._values24.push(
                {
                    value:   hours,
                    caption: hours
                }
            );

            if((hours <= 12 && hours > 0))
            {
                this._values12.push(
                    {
                        value:   hours,
                        caption: hours
                    }
                );
            }
        }

        for(minutes = 0; minutes <= 59; minutes++)
        {
            this._valuesMinutes.push(
                {
                    value:   minutes,
                    caption: minutes
                }
            );
        }
    }

    private onTouchedCallback:() => void = () =>
    {
        // Nothing to do here
    }

    private onChangeCallback:(_:any) => void = (_) =>
    {
        // Nothing to do here
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
        this._value = value;
    }

    public get value():Date
    {
        if(this._valueFormat === TimeFormat.AMERICAN)
        {
            this._value = new Date(this._selectedHour.value [this._selectedMinute.value]);
        }
        else
        {
            this._value = new Date(this._selectedHour.value [this._selectedMinute.value]);
        }

        console.log(this._value);

        return this._value;
    }

    public set value(value:Date)
    {
        this._value = value;
    }

    public changeHourSelectionValues():void
    {
        if(this._valueFormat === TimeFormat.EUROPEAN)
        {
            this._valueHours = this._values24;
            this._is24HourFormat = true;
        }
        else
        {
            this._valueHours = this._values12;
            this._is24HourFormat = false;
        }
    }

    public printValueInConsole():void
    {
        console.log(this._value);
    }
}
