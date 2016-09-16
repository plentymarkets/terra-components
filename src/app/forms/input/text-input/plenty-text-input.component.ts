import {
    Component,
    forwardRef
} from '@angular/core';
import { PlentyInputComponent } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';
import {
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const TEXT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyTextInput),
    multi:       true
};

@Component({
               selector:    'plenty-text-input',
               templateUrl: './plenty-text-input.component.html',
               styleUrls:   ['./plenty-text-input.component.css'],
               providers:   [TEXT_INPUT_CONTROL_VALUE_ACCESSOR]
           })
export class PlentyTextInput extends PlentyInputComponent
{
    constructor()
    {
        super('text', PlentyRegex.MIXED);
    }
}
