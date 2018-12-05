import {
    Component,
    forwardRef,
    HostListener,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

/**
 * @author mfrank
 * @deprecated use <terra-radio-input> and <terra-radio-group> instead
 */
@Component({
    selector:  'terra-radio-button',
    template:  require('./terra-radio-button.component.html'),
    styles:    [require('./terra-radio-button.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraRadioButtonComponent),
            multi:       true
        }
    ]
})
export class TerraRadioButtonComponent implements ControlValueAccessor
{
    @Input()
    public inputCaption:string;

    @Input()
    public inputValue:string | number | boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputIsUncheckable:boolean;

    public value:any;

    constructor()
    {
        console.warn(`This component is deprecated. Please use <terra-radio-input> and <terra-radio-group> instead.`);
        this.inputIsUncheckable = false;
        this.inputIsDisabled = false;
    }

    @HostListener('click')
    public onClick():void
    {
        if(this.inputIsDisabled)
        {
            return;
        }

        if(this.inputIsUncheckable && this.inputValue === this.value)
        {
            this.value = undefined;
        }
        else
        {
            this.value = this.inputValue;
        }

        this.onTouchedCallback();
        this.onChangeCallback(this.value);
    }

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
