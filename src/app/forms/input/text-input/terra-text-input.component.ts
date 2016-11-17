import {
    Component,
    Input,
    forwardRef,
    ViewEncapsulation
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const TEXT_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraTextInputComponent),
    multi:       true
};

@Component({
               selector:      'terra-text-input',
               styles:        [require('./terra-text-input.component.scss').toString()],
               template:      require('./terra-text-input.component.html'),
               providers:     [TEXT_INPUT_CONTROL_VALUE_ACCESSOR],
               encapsulation: ViewEncapsulation.None
           })
export class TerraTextInputComponent extends TerraInputComponent
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputEmptyMessage:string;
    @Input() inputInvalidMessage:string;
    @Input() inputTooltipText:string;
    @Input() inputDisabled:boolean;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() inputMaxLength:number;
    @Input() inputMaxValue:number;
    @Input() inputMinLength:number;
    @Input() inputMinValue:number;
    
    constructor()
    {
        super('text', TerraRegex.MIXED);
    }
    
    @Input() public set inputValue(v:string)
    {
        this.value = v;
    }
}
