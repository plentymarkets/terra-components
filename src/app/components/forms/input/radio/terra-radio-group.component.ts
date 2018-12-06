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
 * @author pweyrich
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
        this.changeCallback(this._value);
    }

    /**
     * get the current value of the radio group
     */
    public get value():any
    {
        return this._value;
    }

    /**
     * set the value of the radio group.
     * @param value
     */
    public writeValue(value:any):void
    {
        this.value = value;
    }

    /**
     * register a change callback which is executed when the #value of the radio group changes
     * @param fn
     */
    public registerOnChange(fn:(_:any) => void):void
    {
        this.changeCallback = fn;
    }
    /**
     * register a touched callback which is executed when one of the given radio inputs has been visited
     * TODO: To be implemented
     * @param fn
     */
    public registerOnTouched(fn:() => void):void
    {
        this.touchedCallback = fn;
    }

    private touchedCallback:() => void = ():void => undefined;

    private changeCallback:(_:any) => void = (_:any):void => undefined;
}
