import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { PlentyInput } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyDoubleInput),
    multi:       true
};

@Component({
               selector:    'plenty-double-input',
               templateUrl: './plenty-double-input.component.html',
               styleUrls:   ['./plenty-double-input.component.css'],
               providers:   [DOUBLE_INPUT_CONTROL_VALUE_ACCESSOR]
           })
export class PlentyDoubleInput extends PlentyInput
{
    @Input() name: string;
    @Input() isRequired: boolean;
    @Input() tooltipPlacement: string; //top, bottom, left, right (default: top)
    @Input() tooltipText: string;
    @Input() disabled: boolean;

    constructor()
    {
        super('number', PlentyRegex.DOUBLE);
    }
}
