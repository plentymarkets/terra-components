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
    /**
     * @description If true, the input will be disabled. Default false.
     * */
    @Input()
    public inputIsDisabled:boolean = false; // TODO: This input has no effect on the control!!

    @Language()
    public _lang:string;

    public valuesHours:Array<TerraSelectBoxValueInterface> = [];
    public valuesMinutes:Array<TerraSelectBoxValueInterface> = [];

    /**
     * @description The form instance managing the value of the hours and minutes select.
     * @private
     */
    public _form:FormGroup = new FormGroup({
        hours: new FormControl(),
        minutes: new FormControl()
    });

    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(_:Date) => void = noop;

    /** @description Stream that emits and completes when the component is destroyed. */
    private readonly _destroy$:Subject<void> = new Subject();

    constructor()
    {
        // initialize select options
        this.createTimeValues();
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

    /* TODO: This should be private */
    /** @deprecated */
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

    /**
     * @description Called whenever the user changes the time - either the hours or the minutes.
     * Notifies the bound form control about the change by passing a new date object.
     * @private
     */
    public _onChange():void
    {
        const date:Date = new Date();
        date.setHours(this._form.value.hours);
        date.setMinutes(this._form.value.minutes);
        this._onChangeCallback(date);
        this._onTouchedCallback(); // TODO: This should be called whenever the blur event of any of the two selects occurs
    }
}
