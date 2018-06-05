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
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { isNullOrUndefined } from 'util';

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

    public valuesHours:Array<TerraSelectBoxValueInterface>;
    public valuesMinutes:Array<TerraSelectBoxValueInterface>;
    private value:Date;


    constructor()
    {
        this.valuesHours = [];
        this.valuesMinutes = [];
        this.value = new Date();
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
            this.valuesHours.push(
                {
                    value:   hours,
                    caption: hours
                }
            );
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

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;

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
        this.value = value;
    }

    protected get minutes():number
    {
        if(!isNullOrUndefined(this.value))
        {
            return this.value.getMinutes();
        }
        return 0;
    }

    protected set minutes(minutes:number)
    {
        if(!isNullOrUndefined(this.value))
        {
            this.value.setMinutes(minutes);
        }

        this.onChangeCallback(this.value);
        this.onTouchedCallback();
    }

    protected get hours():number
    {
        if(!isNullOrUndefined(this.value))
        {
            return this.value.getHours();
        }
        return 0;
    }

    protected set hours(minutes:number)
    {
        if(!isNullOrUndefined(this.value))
        {
            this.value.setHours(minutes);
        }

        this.onChangeCallback(this.value);
        this.onTouchedCallback();
    }
}
