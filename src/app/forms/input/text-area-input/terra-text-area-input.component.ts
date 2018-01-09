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
     * @description Set the number of maximum rows.
     * */
    @Input() inputMaxRows:number;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    private _id:string;

    constructor()
    {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `text-area-input_#${nextId++}`;
    }
}
