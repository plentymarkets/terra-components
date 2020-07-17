/**
 * @author twieder
 */
import {
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { isNullOrUndefined } from 'util';
import { noop } from 'rxjs';
import { Language } from 'angular-l10n';

@Component({
    selector:    'terra-time-picker',
    styleUrls:   ['./terra-time-picker.component.scss'],
    templateUrl: './terra-time-picker.component.html',
    providers:   [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: TerraTimePickerComponent,
            multi:       true
        }
    ]
})
export class TerraTimePickerComponent implements OnInit, ControlValueAccessor, OnDestroy
{
    /**
     * @description If true, the input will be disabled. Default false.
     * */
    @Input() public inputIsDisabled:boolean = false; // TODO: This input has no effect on the control!!

    public valuesHours:Array<TerraSelectBoxValueInterface> = [];
    public valuesMinutes:Array<TerraSelectBoxValueInterface> = [];

    @Language()
    public _lang:string;

    private _value:Date = new Date();

    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(_:any) => void = noop;

    public ngOnInit():void
    {
        this.createTimeValues();
    }

    public ngOnDestroy():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
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

    public registerOnChange(fn:any):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this._onTouchedCallback = fn;
    }

    public writeValue(value:Date):void
    {
        this._value = value;
    }

    public get _minutes():number
    {
        if(!isNullOrUndefined(this._value))
        {
            return this._value.getMinutes();
        }
        return 0;
    }

    public set _minutes(minutes:number)
    {
        // TODO: if value is null or undefined it would be impossible for the user to change the minutes 
        if(!isNullOrUndefined(this._value))
        {
            this._value.setMinutes(minutes);
        }

        this._onChangeCallback(this._value);
        this._onTouchedCallback();
    }

    public get _hours():number
    {
        if(!isNullOrUndefined(this._value))
        {
            return this._value.getHours();
        }
        return 0;
    }

    public set _hours(hours:number)
    {
        // TODO: if value is null or undefined it would be impossible for the user to change the hours 
        if(!isNullOrUndefined(this._value))
        {
            this._value.setHours(hours);
        }

        this._onChangeCallback(this._value);
        this._onTouchedCallback();
    }
}
