import {
    Component,
    forwardRef,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { PlentyInput } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyDoubleInput),
    multi:       true
};

@Component({
               selector:      'terra-double-input',
               styles:        [require('./plenty-double-input.component.scss').toString()],
               template:      require('./plenty-double-input.component.html'),
               providers:     [DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR],
               encapsulation: ViewEncapsulation.None
           })
export class PlentyDoubleInput extends PlentyInput
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() inputTooltipText:string;
    @Input() inputDisabled:boolean;
    
    constructor()
    {
        super('number', PlentyRegex.DOUBLE);
    }
}
