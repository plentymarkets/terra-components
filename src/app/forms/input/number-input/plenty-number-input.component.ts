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

export const NUMBER_INPUT_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyNumberInput),
    multi:       true
};

@Component({
               selector:  'plenty-number-input',
               styles:    [require('./plenty-number-input.component.scss').toString()],
               encapsulation: ViewEncapsulation.None,
               providers: [NUMBER_INPUT_CONTROL_VALUE_ACCESSOR],
               template:  require('./plenty-number-input.component.html')
           })
export class PlentyNumberInput extends PlentyInput
{
    @Input() name:string;
    @Input() isRequired:boolean;
    @Input() emptyMessage:string;
    @Input() invalidMessage:string;
    @Input() tooltipText:string;
    @Input() disabled:boolean;
    @Input() tooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() maxLength:number;
    @Input() maxValue:number;
    @Input() minLength:number;
    @Input() minValue:number;

    constructor()
    {
        super('number', PlentyRegex.NUMERIC);
    }
}
