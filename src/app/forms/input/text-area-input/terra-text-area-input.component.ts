import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector:  'terra-text-area-input',
    styles:    [require('./terra-text-area-input.component.scss')],
    template:  require('./terra-text-area-input.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraTextAreaInputComponent),
            multi:       true
        }
    ]
})
export class TerraTextAreaInputComponent extends TerraInputComponent
{
    /**
     * @deprecated inputType is no longer used.  It will be removed in one of the upcoming releases.
     * @param v
     */
    @Input() set inputType(v:string)
    {
        console.warn('inputType is no longer used.  It will be removed in one of the upcoming releases.');
    }

    /**
     * @deprecated inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.
     * @param v
     */
    @Input()
    public set inputValue(v:string)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');

        this.value = v;
    }

    /**
     * @description Set the number of maximum rows.
     * */
    @Input() inputMaxRows:number;
    /**
     * @deprecated Will be removed in an upcoming release.
     * */
    @Input() inputMaxCols:number;

    constructor()
    {
        super(TerraRegex.MIXED);
    }
}
