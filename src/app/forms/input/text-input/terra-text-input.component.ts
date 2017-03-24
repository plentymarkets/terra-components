import {
    Component,
    Input,
    forwardRef
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const TEXT_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraTextInputComponent),
    multi:       true
};

@Component({
               selector:  'terra-text-input',
               styles:    [require('./terra-text-input.component.scss')],
               template:  require('./terra-text-input.component.html'),
               providers: [TEXT_INPUT_CONTROL_VALUE_ACCESSOR]
           })
export class TerraTextInputComponent extends TerraInputComponent
{
    @Input() inputType:string;
    
    constructor()
    {
        super('', TerraRegex.MIXED);
        this.inputType = "text";
    }
    
    @Input()
    public set inputValue(v:string)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        
        this.value = v;
    }
}
