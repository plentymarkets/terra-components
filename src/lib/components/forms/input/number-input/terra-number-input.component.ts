import { Component } from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';

let nextId:number = 0;

@Component({
    selector:  'terra-number-input',
    styleUrls: ['./terra-number-input.component.scss'],
    templateUrl: './terra-number-input.component.html',
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: TerraNumberInputComponent,
            multi:       true
        }
    ]
})
/**
 * @deprecated since v4. Use '<mat-input>' instead. See {@link https://material.angular.io/components/input/overview}
 */
export class TerraNumberInputComponent extends TerraInputComponent
{
    /**
     * @description a unique string identifier for the specific input instance.
     */
    public _id:string;

    constructor()
    {
        super(TerraRegex.NUMERIC);

        // generate the id of the input instance
        this._id = `number-input_#${nextId++}`;
    }

    /**
     * Set the focus on the native input element.
     */
    public focusNativeInput():void
    {
        setTimeout(() =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this._id);
            input.focus();
        });
    }

    /**
     * Select the content of the native input element.
     */
    public selectNativeInput():void
    {
        setTimeout(() =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this._id);
            input.select();
        });
    }
}
