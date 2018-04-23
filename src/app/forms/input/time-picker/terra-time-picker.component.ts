/**
 * @author twieder
 */
import {
    AfterViewInit,
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

export class TerraTimePickerComponent implements AfterViewInit, ControlValueAccessor
{
    /**
     * @description If true, the input will be disabled. Default false.
     * */
    @Input() public inputIsDisabled:boolean;


    public _selectedMinute:number;
    public _selectedHour:number;
    public _values24:Array<TerraSelectBoxValueInterface>;
    public _valueHours:Array<TerraSelectBoxValueInterface>;
    public _valuesMinutes:Array<TerraSelectBoxValueInterface>;
    private _value:Date;

    private initDone:boolean;

    constructor()
    {
        this._values24 = [];
        this._valueHours = [];
        this._valuesMinutes = [];
        this._value = new Date();
        this.inputIsDisabled = false;
        this.changeHourSelectionValues();
        this.initDone = false;
    }

    public ngAfterViewInit():void
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

        this.initDone = true;
    }

    private onTouchedCallback:() => void = () =>
    {
        // Nothing to do here
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

    public writeValue(value:Date):void
    {
        this._value = value;

        if(this.initDone)
        {
            this._selectedHour = this.value.getHours();
            this._selectedMinute = this.value.getMinutes();
        }
    }

    public get value():Date
    {
        return this._value;
    }

    public set value(value:Date)
    {
        this.writeValue(value);
    }

    protected hoursChanged(hours:number):void
    {
        if(this.initDone)
        {
            this.value.setHours(hours);
        }
    }

    protected minutesChange(minutes:number):void
    {
        if(this.initDone)
        {
            this.value.setMinutes(minutes);
        }
    }
}
