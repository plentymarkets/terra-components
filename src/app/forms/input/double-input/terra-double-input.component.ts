import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector:  'terra-double-input',
    styles:    [require('./terra-double-input.component.scss')],
    template:  require('./terra-double-input.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraDoubleInputComponent),
            multi:       true
        }
    ]
})
export class TerraDoubleInputComponent extends TerraInputComponent
{
    /**
     * @description If true, the value will be right-aligned.
     * */
    @Input() inputIsPriceInput:boolean;

    constructor()
    {
        super(TerraRegex.DOUBLE);
    }

    @Input()
    public set inputValue(v:number)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');

        this.value = v;
    }
}
