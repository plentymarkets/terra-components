import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Time } from '@angular/common';
import {
    FormControl,
    FormGroup,
    NgControl
} from '@angular/forms';
import { Subject } from 'rxjs';
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
export class TimePickerComponent implements MatFormFieldControl<Time>, OnDestroy, OnChanges
{
    public static nextId:number = 0;

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
        }
        this._form.setValue(value);
        this.stateChanges.next();
    }

    public readonly autofilled:boolean;
    public readonly controlType:string = 'time-picker';

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

    public readonly errorState:boolean = false;
    public focused:boolean = false;

    @HostBinding()
    public readonly id:string = `time-picker-${TimePickerComponent.nextId++}`;

    public readonly ngControl:NgControl | null = null;

    @Input()
    public placeholder:string;
    @Input()
    public required:boolean;

    @HostBinding('class.floating')
    public get shouldLabelFloat():boolean
    {
        return this.focused || !this.empty;
    }

    @HostBinding('attr.aria-describedby') public describedBy:string = '';

    public readonly stateChanges:Subject<void> = new Subject();
    public _form:FormGroup = new FormGroup({
        hours:   new FormControl(),
        minutes: new FormControl()
    });
    public hours = new Array(24);
    public minutes = new Array(60);

    constructor(private fm:FocusMonitor, private elRef:ElementRef<HTMLElement>)
    {
        fm.monitor(elRef.nativeElement, true).subscribe((origin:FocusOrigin) =>
        {
            this.focused = !!origin;
            this.stateChanges.next();
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

    public displayValue(value:number):string
    {
        if(isNullOrUndefined(value))
        {
            return '';
        }
        return value.toString().length === 1
            ? '0' + value
            : value.toString();
    }

}
