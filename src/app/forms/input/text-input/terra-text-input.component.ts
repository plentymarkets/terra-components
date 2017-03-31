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
    /**
     * @deprecated
     * @param v
     */
    @Input() set inputType(v:string)
    {
        console.warn('inputType is no longer used.  It will be removed in one of the upcoming releases.');
    }
    
    /**
     * @deprecated
     * @param v
     */
    @Input()
    public set inputValue(v:string)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        
        this.value = v;
    }
    
    constructor()
    {
        super(TerraRegex.MIXED);
    }
}
