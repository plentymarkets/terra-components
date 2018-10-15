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
import { TerraRegex } from '../../../../helpers/regex/terra-regex';

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
     */
    @Input()
    public inputIsPassword:boolean;

    /**
     * @description If true, the input will check if the input is a valid iban.
     */
    @Input()
    public inputIsIban:boolean;

    /**
     * @description If true, the value cannot be changed. Default false.
     */
    @Input()
    public inputIsReadonly:boolean;

    @Output()
    public outputOnInput:EventEmitter<any> = new EventEmitter<any>();

    /**
     * @description a unique string identifier for the specific input instance.
     */
    protected id:string;

    constructor(private translation:TranslationService)
    {
        super(TerraRegex.MIXED);

        if(isNullOrUndefined(this.inputIsPassword))
        {
            this.inputIsPassword = false;
        }

        // generate the id of the input instance
        this.id = `text-input_#${nextId++}`;

        this.inputIsIban = false;
    }

    public onInput():void
    {
        this.outputOnInput.emit();

    }

    public focusNativeInput():void
    {
        setTimeout(() =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this.id);
            input.focus();
        });
    }

    public selectNativeInput():void
    {
        setTimeout(() =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this.id);
            input.select();
        });
    }

    private onCustomBlur(iban:string):void
    {
        if(this.inputIsIban)
        {
            this.isValid = IBAN.isValid(iban);
            this.inputTooltipText = this.isValid ? null : this.translation.translate('terraTextInput.invalidIban');
        }

        this.onBlur();
    }
}
