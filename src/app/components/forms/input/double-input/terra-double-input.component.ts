import {
    Component,
    forwardRef,
    Input,
    OnInit
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { DefaultLocale } from 'angular-l10n';

let nextId:number = 0;

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
export class TerraDoubleInputComponent extends TerraInputComponent implements OnInit
{
    /**
     * @description If true, the value will be right-aligned.
     */
    @Input()
    public inputIsPriceInput:boolean;

    /**
     *
     * @description Set the decimal count. Default is 2. (0.01)
     */
    @Input()
    public inputDecimalCount:number = 2;

    @DefaultLocale()
    protected locale:string;

    protected step:number;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    protected id:string;

    /**
     * @deprecated
     * @param {number} v
     */
    @Input()
    public set inputValue(v:number)
    {
        console.warn('inputValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');

        this.value = v;
    }

    constructor()
    {
        super(TerraRegex.DOUBLE);

        // generate the id of the input instance
        this.id = `double-input_#${nextId++}`;
    }

    public ngOnInit():void
    {
        this.regex = TerraRegex.getDouble(this.inputDecimalCount);
        this.step = 1 / (Math.pow(10, this.inputDecimalCount));
    }

    /**
     * Set the focus on the native input element.
     */
    public focusNativeInput():void
    {
        setTimeout(() =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this.id);
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
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this.id);
            input.select();
        });
    }
}
