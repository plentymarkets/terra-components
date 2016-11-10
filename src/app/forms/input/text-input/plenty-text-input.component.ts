import {
    Component,
    Input,
    forwardRef,
    ViewEncapsulation
} from '@angular/core';
import { PlentyInput } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const TEXT_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyTextInput),
    multi:       true
};

@Component({
               selector:      'terra-text-input',
               styles:        [require('./plenty-text-input.component.scss').toString()],
               template:      require('./plenty-text-input.component.html'),
               providers:     [TEXT_INPUT_CONTROL_VALUE_ACCESSOR],
               encapsulation: ViewEncapsulation.None
           })
export class PlentyTextInput extends PlentyInput
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
        super('text', PlentyRegex.MIXED);
    }
}
