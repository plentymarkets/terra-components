import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Self,
    SimpleChanges
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Time } from '@angular/common';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NgControl
} from '@angular/forms';
import {
    noop,
    Subject
} from 'rxjs';
import {
    FocusMonitor,
    FocusOrigin
} from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isNullOrUndefined } from 'util';

@Component({
    selector:    'tc-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls:   ['./time-picker.component.scss'],
    providers:   [{
        provide:     MatFormFieldControl,
        useExisting: TimePickerComponent
    }]
})
export class TimePickerComponent implements MatFormFieldControl<Time>, OnDestroy, OnChanges, ControlValueAccessor
{
    public static nextId:number = 0;

    @Input()
    public placeholder:string;
    @Input()
    public required:boolean;

    @Input()
    public get value():Time | null
    {
        return this._form.value;
    }

    public set value(value:Time | null)
    {
        if(!value)
        {
            this._form.reset();
            return;
        }
        this._form.setValue(value, {emitEvent: false});
    }

    @Input()
    public get disabled():boolean
    {
        return this._form.disabled;
    }
    public set disabled(value:boolean)
    {
        const disabled:boolean = coerceBooleanProperty(value);
        disabled ? this._form.disable() : this._form.enable();
        this.stateChanges.next();
    }

    public get empty():boolean
    {
        const v:Time = this._form.value;
        return !v || (isNullOrUndefined(v.hours) && isNullOrUndefined(v.minutes));
    }

    @HostBinding()
    public readonly id:string = `time-picker-${TimePickerComponent.nextId++}`;

    @HostBinding('attr.aria-describedby')
    public describedBy:string = '';

    @HostBinding('class.floating')
    public get shouldLabelFloat():boolean
    {
        return this.focused || !this.empty;
    }

    public focused:boolean = false;
    public readonly autofilled:boolean;
    public readonly controlType:string = 'time-picker';
    public readonly errorState:boolean = false;
    public readonly stateChanges:Subject<void> = new Subject();
    public _form:FormGroup = new FormGroup({
        hours:   new FormControl(null),
        minutes: new FormControl(null)
    });
    public _hours:Array<undefined> = new Array(24);
    public _minutes:Array<undefined> = new Array(60);

    private _onChangeCallback:(time:Time) => void = noop;
    private _onTouchedCallback:() => void = noop;

    constructor(
        private fm:FocusMonitor,
        private elRef:ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl:NgControl
    )
    {
        // Replace the provider from above with this.
        if (this.ngControl !== null)
        {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        fm.monitor(elRef.nativeElement, true).subscribe((origin:FocusOrigin) =>
        {
            if(this.focused && !origin)
            {
                this._onTouchedCallback();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

        this._form.valueChanges.subscribe((value:Time) =>
        {
            this.stateChanges.next();
            this._onChangeCallback(value);
        });
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('placeholder'))
        {
            this.stateChanges.next();
        }

        if(changes.hasOwnProperty('required'))
        {
            this.required = coerceBooleanProperty(this.required);
            this.stateChanges.next();
        }
    }

    public ngOnDestroy():void
    {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    public onContainerClick(event:MouseEvent):void
    {
        if((event.target as Element).tagName.toLowerCase() !== 'input')
        {
            (this.elRef.nativeElement.querySelector('mat-select') as HTMLElement).focus();
        }
    }

    public setDescribedByIds(ids:Array<string>):void
    {
        this.describedBy = ids.join(' ');
    }

    public registerOnChange(fn:(time:Time) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled:boolean):void
    {
        this.disabled = isDisabled;
    }

    public writeValue(value:Time):void
    {
        this.value = value;
    }

}
