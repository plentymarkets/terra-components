import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import * as IBAN from 'iban';
import { TranslationService } from 'angular-l10n';
import { TerraRegex } from '../../../../../';

let nextId:number = 0;

@Component({
    selector:  'terra-text-input',
    styles:    [
        require('./terra-text-input.component.scss'),
        require('../terra-input.component.glob.scss').toString()
    ],
    template:  require('./terra-text-input.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraTextInputComponent),
            multi:       true
        }
    ]
})
export class TerraTextInputComponent extends TerraInputComponent
{
    /**
     * @description If true, the type of input will be 'password'.
     * */
    @Input() inputIsPassword:boolean;

    @Input() inputIsIban:boolean = false;

    /**
     * @description If true, the value cannot be changed. Default false.
     * */
    @Input() inputIsReadonly:boolean;

    @Output() outputOnInput:EventEmitter<any> = new EventEmitter<any>();

    /**
     * @deprecated inputType is no longer used.  It will be removed in one of the upcoming releases.
     * @param v
     */
    @Input()
    set inputType(v:string)
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
     * @description a unique string identifier for the specific input instance.
     */
    private _id:string;

    public constructor(private _translation:TranslationService)
    {
        super(TerraRegex.MIXED);

        if(isNullOrUndefined(this.inputIsPassword))
        {
            this.inputIsPassword = false;
        }

        // generate the id of the input instance
        this._id = `text-input_#${nextId++}`;
    }

    public onInput():void
    {
        this.outputOnInput.emit();

    }

    private onCustomBlur(iban:string):void
    {
        if(this.inputIsIban)
        {
            this.isValid = IBAN.isValid(iban);
            this.inputTooltipText = this.isValid ? null : this._translation.translate('terraTextInput.invalidIban');
        }

        this.onBlur();
    }
}
