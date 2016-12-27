import {
    Component,
    Input,
    HostListener,
    forwardRef
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const RADIO_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraRadioButtonComponent),
    multi:       true
};

/**
 * @author mfrank
 */
@Component({
               selector:  'terra-radio-button',
               template:  require('./terra-radio-button.component.html'),
               styles:    [require('./terra-radio-button.component.scss').toString()],
               providers: [RADIO_CONTROL_VALUE_ACCESSOR]
           })
export class TerraRadioButtonComponent implements ControlValueAccessor
{
    @Input() inputCaption:string;
    @Input() inputName:string;
    @Input() inputIsDisabled:boolean;
    @Input() inputValue:any;
    @Input() inputIsUncheckable:boolean;
    
    @HostListener('click')
    public onClick():void
    {
        if(this.inputIsDisabled)
        {
            return;
        }
        
        if(this.inputIsUncheckable && this.inputName === this.inputValue)
        {
            this.inputValue = undefined;
        }
        else
        {
            this.inputValue = this.inputName;
        }
        
        this.onTouchedCallback();
        this.onChangeCallback(this.inputValue);
    }
    
    private onTouchedCallback:() => void = () =>
    {
    };
    
    private onChangeCallback:(_:any) => void = (_) =>
    {
    };
    
    constructor()
    {
    }
    
    public writeValue(value:any):void
    {
        this.inputValue = value;
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
