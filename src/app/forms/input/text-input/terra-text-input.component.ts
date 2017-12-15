import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { TerraRegex } from '../../../regex/terra-regex';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import * as IBAN from 'iban';
import { TranslationService } from 'angular-l10n';

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
     * @description a unique string identifier for the specific input instance.
     */
    private _id:string;

    constructor(private _translation:TranslationService)
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
