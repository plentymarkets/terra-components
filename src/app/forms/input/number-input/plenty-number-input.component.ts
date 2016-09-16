import {
    Component,
    forwardRef
} from '@angular/core';
import { PlentyInputComponent } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';
import { TooltipDirective } from 'ng2-bootstrap/components/tooltip/tooltip.directive';
import {
    // REACTIVE_FORM_DIRECTIVES,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const NUMBER_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyNumberInput),
    multi:       true
};

@Component({
               selector:    'plenty-plenty-number-input',
               templateUrl: './plenty-number-input.component.html',
               styleUrls:   ['./plenty-number-input.component.css'],
               providers:   [NUMBER_INPUT_CONTROL_VALUE_ACCESSOR],
               directives:  [TooltipDirective]
           })
export class PlentyNumberInput extends PlentyInputComponent
{
    constructor()
    {
        super('number', PlentyRegex.NUMERIC);
    }
}
