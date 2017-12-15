import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId:number = 0;

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

        // generate the id of the input instance
        this._id = `number-input_#${nextId}`;
    }

    /**
     * @description a unique string identifier for the specific input instance.
     */
    private _id:string;
}
