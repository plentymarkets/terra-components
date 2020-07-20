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
    NG_VALUE_ACCESSOR,
    FormGroup,
    FormControl
} from '@angular/forms';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';
import { isDate } from 'util';
import { noop, Subject } from 'rxjs';
import { Language } from 'angular-l10n';
import { takeUntil, tap } from 'rxjs/operators';

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

    public _form:FormGroup = new FormGroup({
        hours: new FormControl(),
        minutes: new FormControl()
    });

    public readonly _valuesHours:Array<TerraSelectBoxValueInterface> = [];
    public readonly _valuesMinutes:Array<TerraSelectBoxValueInterface> = [];

    @Language()
    public _lang:string;

    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(_:Date) => void = noop;

    private readonly _destroy$:Subject<void> = new Subject();

    constructor()
    {
        // initialize the options
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

    public registerOnChange(fn:(date:Date) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public writeValue(date:Date):void
    {
        if(!isDate(date))
        {
            console.log('Not a date');
            return;
        }

        this._form.setValue(
            {
            hours: date.getHours(),
            minutes: date.getMinutes()
            },
            {
                emitEvent: false
            }
        );
    }

    public _onChange():void
    {
        const date:Date = new Date();
        date.setHours(this._form.value.hours);
        date.setMinutes(this._form.value.minutes);
        this._onChangeCallback(date);
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
