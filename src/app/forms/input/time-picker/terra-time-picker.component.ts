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
import moment = require('moment');

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
    @Input() private inputIsDisabled:boolean;



    private _selectedMinute:TerraSelectBoxValueInterface;
    private _selectedHour:TerraSelectBoxValueInterface;
    private _value:any;
    private _valueFormat:TimeFormat;
    private _valuePMAM:DayFormat;
    private _values24:Array<TerraSelectBoxValueInterface> = [];
    private _values12:Array<TerraSelectBoxValueInterface> = [];
    private _valueHours:Array<TerraSelectBoxValueInterface> = [];
    private _valuesMinutes:Array<TerraSelectBoxValueInterface> = [];
    private _is24HourFormat:boolean = true;
    private _timeFormatEnum:any = TimeFormat;
    private _dayFormat:any = DayFormat;

    constructor()
    {
        // Nothing to do here
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

    public get value():any
    {
        let time:any;

        if(this._valueFormat === TimeFormat.AMERICAN)
        {
            time = moment(this._valuePMAM + '-' + this._selectedHour.value + '-' + this._selectedMinute.value, 'a-hh-mm');

            // this._value = this._valuePMAM + ' ' + this._selectedHour.value + ':' + this._selectedMinute.value;
        }
        else
        {
            time = moment(this._selectedHour.value + '-' + this._selectedMinute.value, 'HH-mm');

            // this._value = this._selectedHour.value + ':' + this._selectedMinute.value;
        }

        this._value = time;

        return this._value;
    }

    public set value(value:any)
    {
        this._value = value;
    }

    public changeValues():void
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
}
