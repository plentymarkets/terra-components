/**
 * @author twieder
 */
import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

@Component({
    selector:  'terra-time-picker',
    styles:    [
        require('./terra-time-picker.component.scss'),
        require('./terra-time-picker.component.glob.scss').toString()
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
     * @description
     */
    @Input() inputTimeFormat:string;


    private _value:any;
    private _valueFormat:any;
    private _valuePMAM:any;
    public values24:Array<TerraSelectBoxValueInterface> = [];
    public values12:Array<TerraSelectBoxValueInterface> = [];
    public valueHours:Array<TerraSelectBoxValueInterface> = [];
    public valuesMinutes:Array<TerraSelectBoxValueInterface> = [];
    public is24HourFormat:boolean = true;

    constructor()
    {
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
            if(!(hours <= 12 && hours > 0))
            {
                this.values24.push(
                    {
                        value:   hours,
                        caption: hours
                    }
                )
            }
            else
            {
                this.values24.push(
                    {
                        value:   hours,
                        caption: hours
                    }
                );

                this.values12.push(
                    {
                        value:   hours,
                        caption: hours
                    }
                )

            }
        }

        for(minutes = 0; minutes <= 59; minutes++)
        {
            this.valuesMinutes.push(
                {
                    value:   minutes,
                    caption: minutes
                }
            );
        }
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
    }

    public get value()
    {
        return this._value;
    }

    public set value(value:any)
    {
    }

    public changeValues():void
    {
        if(this._valueFormat === "24")
        {
            this.valueHours = this.values24;
            this.is24HourFormat = true;
        }
        else
        {
            this.valueHours = this.values12;
            this.is24HourFormat = false;
        }
    }

}