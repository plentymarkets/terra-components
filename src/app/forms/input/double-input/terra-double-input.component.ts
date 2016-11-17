import {
    Component,
    forwardRef,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraDoubleInputComponent),
    multi:       true
};

@Component({
               selector:      'terra-double-input',
               styles:        [require('./terra-double-input.component.scss').toString()],
               template:      require('./terra-double-input.component.html'),
               providers:     [DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR],
               encapsulation: ViewEncapsulation.None
           })
export class TerraDoubleInputComponent extends TerraInputComponent
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() inputTooltipText:string;
    @Input() inputDisabled:boolean;
    
    constructor()
    {
        super('number', TerraRegex.DOUBLE);
    }
    
    @Input()
    public set inputValue(v:number)
    {
        this.value = v;
    }
}
