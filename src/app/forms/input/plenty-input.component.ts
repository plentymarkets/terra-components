import { Input } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl
} from '@angular/forms';
import { PlentyAlert } from '../../alert/plenty-alert.component';

export class PlentyInputComponent implements ControlValueAccessor
{
    @Input() name: string;
    @Input() isRequired: boolean;
    @Input() emptyMessage: string;
    @Input() invalidMessage: string;
    @Input() tooltipText: string;
    @Input() disabled: boolean;
    @Input() tooltipPlacement: string; //top, bottom, left, right (default: top)
    @Input() maxLength: number;
    @Input() maxValue: number;
    @Input() minLength: number;
    @Input() minValue: number;
    protected type: string;
    private _isValid: boolean;
    private _regex: string;
    private alert: PlentyAlert = PlentyAlert.getInstance();

    //The internal data model
    private innerValue: any = '';

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = () =>
    {
    };

    private onChangeCallback: (_: any) => void = () =>
    {
    };

    constructor(private inputType: string,
                private inputRegex: string)
    {
        this.type = inputType;
        this.regex = inputRegex;
        this.isValid = true;
        this.tooltipPlacement = 'top';
    }

    public get isDisabled(): boolean
    {
        return this.disabled;
    }

    public set isDisabled(value: boolean)
    {
        this.disabled = value;
    }

    public get isValid(): boolean
    {
        return this._isValid;
    }

    public set isValid(value: boolean)
    {
        this._isValid = value;
    }

    //get accessor
    public get value(): any
    {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    public set value(v: any)
    {
        if(v !== this.innerValue)
        {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    private onBlur(): void
    {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any)
    {
        if(value !== this.innerValue)
        {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any)
    {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any)
    {
        this.onTouchedCallback = fn;
    }

    public validate(formControl: FormControl): void
    {
        if(formControl.valid)
        {
            this.isValid = true;
        }
        else
        {
            if(!this.isDisabled)
            {
                this.isValid = false;

                if(this.isRequired && this.value.length == 0)
                {
                    let emptyMessage: string;

                    if(!this.emptyMessage || this.emptyMessage.length == 0)
                    {
                        //TODO i18n
                        emptyMessage = 'Mach eine Eingabe!';

                    }
                    else
                    {
                        emptyMessage = this.emptyMessage;
                    }

                    this.alert.addAlert(emptyMessage, true, 'danger', 0);
                }
                else if(this.value.length > 0)
                {
                    let invalidMessage: string;

                    if(!this.invalidMessage || this.invalidMessage.length == 0)
                    {
                        //TODO i18n
                        invalidMessage = 'Eingabe ungültig!';
                    }
                    else
                    {
                        invalidMessage = this.invalidMessage;
                    }

                    this.alert.addAlert(invalidMessage, true, 'danger', 0);
                }
            }
        }
    }

    public get regex(): string
    {
        return this._regex;
    }

    public set regex(value: string)
    {
        this._regex = value;
    }
}
