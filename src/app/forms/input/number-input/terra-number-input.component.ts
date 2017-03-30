import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const NUMBER_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraNumberInputComponent),
    multi:       true
};

@Component({
               selector:  'terra-number-input',
               styles:    [require('./terra-number-input.component.scss')],
               template:  require('./terra-number-input.component.html'),
               providers: [NUMBER_INPUT_CONTROL_VALUE_ACCESSOR]
           })
export class TerraNumberInputComponent extends TerraInputComponent
{
    constructor()
    {
        super('number', TerraRegex.NUMERIC);
    }
    
    @Input()
    public set inputValue(v:number)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        
        this.value = v;
    }
}
