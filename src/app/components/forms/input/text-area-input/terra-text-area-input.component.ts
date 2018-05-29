import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { isNullOrUndefined } from "util";

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
     * @description If true, a * indicates that the value is required. Default false.
     */
    @Input()
    public inputIsRequired:boolean;

    /**
     * @description If true, the textarea is resizeable. Default true.
     */
    @Input()
    public inputIsResizable:boolean;

    /**
     * @deprecated inputType is no longer used.  It will be removed in one of the upcoming releases.
     * @param v
     */
    @Input()
    public set inputType(v:string)
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
     */
    @Input()
    public inputMaxRows:number;

    /**
     * @deprecated Will be removed in an upcoming release.
     */
    @Input()
    public inputMaxCols:number;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    private _id:string;

    constructor()
    {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `text-area-input_#${nextId++}`;
        this.inputMaxRows = isNullOrUndefined(this.inputMaxRows) ? 4 : this.inputMaxRows;
        this.inputIsResizable = isNullOrUndefined(this.inputIsResizable) ? true : this.inputIsResizable;
    }

    /**
     * Set the focus on the native input element.
     */
    public focusNativeInput():void
    {
        setTimeout(():void =>
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
        setTimeout(():void =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this._id);
            input.select();
        });
    }
}
