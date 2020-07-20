import {
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Time } from '@angular/common';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
    noop,
    Subject
} from 'rxjs';
import { Language } from 'angular-l10n';
import {
    takeUntil,
    tap
} from 'rxjs/operators';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';


/**
 * @author twieder
 * @description A component providing two selects to enable the user to pick a certain point of time of a day.
 */
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
    /** @description If true, the input will be disabled. Default false.*/
    @Input()
    public inputIsDisabled:boolean = false; // TODO: This input has no effect on the control!!

    @Language()
    public _lang:string;

    /**
     * @description The form instance managing the value of the hours and minutes select.
     * @internal
     */
    public _form:FormGroup = new FormGroup({
        hours:   new FormControl(),
        minutes: new FormControl()
    });

    public readonly _valuesHours:Array<TerraSelectBoxValueInterface> = [];
    public readonly _valuesMinutes:Array<TerraSelectBoxValueInterface> = [];

    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(_:Time) => void = noop;

    /** @description Stream that emits and completes when the component is destroyed. */
    private readonly _destroy$:Subject<void> = new Subject();

    constructor()
    {
        // initialize select options
        this._createTimeValues();
    }

    public ngOnInit():void
    {
        this._form.valueChanges.pipe(
            takeUntil(this._destroy$),
            tap(() => this._onChange())
        ).subscribe();
    }

    public ngOnDestroy():void
    {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public registerOnChange(fn:(time:Time) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public writeValue(time:Time):void
    {
        if(!time)
        {
            return this._form.reset();
        }
        this._form.patchValue(time, {emitEvent: false});
    }

    public get _minutes():number
    {
        return this._form.value.minutes;
    }

    public get _hours():number
    {
        return this._form.value.hours;
    }

    /**
     * @description Called whenever the user changes the time - either the hours or the minutes.
     * Notifies the bound form control about the change by passing a new time object.
     * @internal
     */
    public _onChange():void
    {
        this._onChangeCallback(this._form.value);
        this._onTouchedCallback(); // TODO: This should be called whenever the blur event of any of the two selects occurs
    }

    private _createTimeValues():void
    {
        for(let hours:number = 0; hours <= 23; hours++)
        {
            this._valuesHours.push(
                {
                    value:   hours,
                    caption: hours
                }
            );
        }

        for(let minutes:number = 0; minutes <= 59; minutes++)
        {
            this._valuesMinutes.push(
                {
                    value:   minutes,
                    caption: minutes
                }
            );
        }
    }
}
