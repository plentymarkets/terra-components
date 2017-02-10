import {
    Component,
    forwardRef,
    Input
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
               selector:  'terra-double-input',
               styles:    [require('./terra-double-input.component.scss')],
               template:  require('./terra-double-input.component.html'),
               providers: [DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR],
           })
export class TerraDoubleInputComponent extends TerraInputComponent
{
    @Input() inputName:string;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() inputTooltipText:string;
    @Input() inputIsDisabled:boolean;
    @Input() inputIsPriceInput:boolean;
    @Input() inputIsRequired:boolean;
    
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
