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

export const NUMBER_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraNumberInputComponent),
    multi:       true
};

@Component({
               selector:      'terra-number-input',
               styles:        [require('./terra-number-input.component.scss')],
               template:      require('./terra-number-input.component.html'),
               providers:     [NUMBER_INPUT_CONTROL_VALUE_ACCESSOR],
           })
export class TerraNumberInputComponent extends TerraInputComponent
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputEmptyMessage:string;
    @Input() inputInvalidMessage:string;
    @Input() inputTooltipText:string;
    @Input() inputIsDisabled:boolean;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() inputMaxLength:number;
    @Input() inputMaxValue:number;
    @Input() inputMinLength:number;
    @Input() inputMinValue:number;
    
    constructor()
    {
        super('number', TerraRegex.NUMERIC);
    }
    
    @Input()
    public set inputValue(v:number)
    {
        this.value = v;
    }
}
