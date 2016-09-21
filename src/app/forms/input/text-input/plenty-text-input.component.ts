import {
    Component,
    Input,
    forwardRef
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
               selector:  'plenty-text-input',
               styles:    [require('./plenty-text-input.component.scss')],
               providers: [TEXT_INPUT_CONTROL_VALUE_ACCESSOR],
               template:  require('./plenty-text-input.component.html')
           })
export class PlentyTextInput extends PlentyInput
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
        super('text', PlentyRegex.MIXED);
    }
}
