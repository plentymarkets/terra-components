import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector:  'terra-number-input',
    styles:    [require('./terra-number-input.component.scss')],
    template:  require('./terra-number-input.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraNumberInputComponent),
            multi:       true
        }
    ]
})
export class TerraNumberInputComponent extends TerraInputComponent
{
    constructor()
    {
        super(TerraRegex.NUMERIC);
    }
    /**
     * @deprecated inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.
     * */
    @Input()
    public set inputValue(v:number)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');

        this.value = v;
    }
}
