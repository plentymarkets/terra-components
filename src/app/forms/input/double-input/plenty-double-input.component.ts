import {
    Component,
    forwardRef
} from '@angular/core';
import { PlentyInputComponent } from '../plenty-input.component';
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
export class PlentyDoubleInput extends PlentyInputComponent
{
    constructor()
    {
        super('number', PlentyRegex.DOUBLE);
    }
}
