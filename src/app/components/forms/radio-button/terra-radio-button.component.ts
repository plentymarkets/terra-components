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

    private onTouchedCallback:() => void;

    private onChangeCallback:(_:any) => void;

    constructor()
    {
        this.inputIsUncheckable = false;
        this.inputIsDisabled = false;


        this.onTouchedCallback = ():void =>
        {
            return;
        };
        this.onChangeCallback = (_:any):void =>
        {
            return;
        };
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

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }
}
