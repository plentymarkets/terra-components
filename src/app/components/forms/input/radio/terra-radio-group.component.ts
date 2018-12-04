import {
    AfterContentChecked,
    Component,
    ContentChildren,
    DoCheck,
    forwardRef,
    HostListener,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraRadioInputComponent } from './terra-radio-input.component';
import { isNullOrUndefined } from 'util';

/**
 * @author mfrank
 */
@Component({
    selector:  'terra-radio-group',
    template:  require('./terra-radio-group.component.html'),
    styles:    [require('./terra-radio-group.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraRadioGroupComponent),
            multi:       true
        }
    ]
})
export class TerraRadioGroupComponent implements ControlValueAccessor
{
    /**
     * Name of the group. This is projected to the input's name property.
     */
    @Input()
    public name:string;

    /**
     * Content of the <legend>-Element. Usually a string.
     */
    @Input()
    public legend:string;

    private _value:any;

    /**
     * set the value of the radio group
     * @param value
     */
    public set value(value:any)
    {
        this._value = value;
        this.onChangeCallback(this._value);
    }

    /**
     * get the current value of the radio group
     */
    public get value():any
    {
        return this._value;
    }

    /**
     * sets the value of the radio group.
     * @param value
     */
    public writeValue(value:any):void
    {
        this.value = value;
    }

    public registerOnChange(fn:(_:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
