import { Input } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl
} from '@angular/forms';
import { TerraAlertComponent } from '../../alert/terra-alert.component';
import { isNullOrUndefined } from 'util';

export class TerraInputComponent implements ControlValueAccessor
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputEmptyMessage:string;
    @Input() inputInvalidMessage:string;
    @Input() inputTooltipText:string;
    @Input() inputIsDisabled:boolean;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right (default: top)
    @Input() inputMaxLength:number;
    @Input() inputMaxValue:number;
    @Input() inputMinLength:number;
    @Input() inputMinValue:number;
    @Input() inputPlaceholder:string;

    private _isValid:boolean;
    private _regex:string;
    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    //The internal data model
    private _innerValue:any;

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback:() => void = () =>
    {
    };

    private onChangeCallback:(_:any) => void = (_) =>
    {
    };

    constructor(private _inputRegex:string)
    {
        this.regex = _inputRegex;
        this.isValid = true;
        this.inputTooltipPlacement = 'top';
    }

    public get isDisabled():boolean
    {
        return this.inputIsDisabled;
    }

    public set isDisabled(value:boolean)
    {
        this.inputIsDisabled = value;
    }

    public get isValid():boolean
    {
        return this._isValid;
    }

    public set isValid(value:boolean)
    {
        this._isValid = value;
    }

    //get accessor
    public get value():any
    {
        return this._innerValue;
    };

    //set accessor including call the onchange callback
    public set value(v:any)
    {
        if(v !== this._innerValue)
        {
            this._innerValue = v;
            this.onChangeCallback(this._innerValue);
        }
    }

    //Set touched on blur
    private onBlur():void
    {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value:any)
    {
        if(value !== this._innerValue)
        {
            this._innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn:any)
    {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn:any)
    {
        this.onTouchedCallback = fn;
    }

    public validate(formControl:FormControl):void
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

                if(this.inputIsRequired && (isNullOrUndefined(this.value) || this.value.length == 0))
                {
                    let emptyMessage:string;

                    if(!this.inputEmptyMessage || this.inputEmptyMessage.length == 0)
                    {
                        ////TODO i18n
                        //emptyMessage = 'Mach eine Eingabe!';

                    }
                    else
                    {
                        emptyMessage = this.inputEmptyMessage;

                        this._alert.addAlert({
                                                 msg:              emptyMessage,
                                                 closable:         true,
                                                 type:             'danger',
                                                 dismissOnTimeout: 0
                                             });
                    }
                }
                else if(!isNullOrUndefined(this.value) && this.value.length > 0)
                {
                    let invalidMessage:string;

                    if(!this.inputInvalidMessage || this.inputInvalidMessage.length == 0)
                    {
                        ////TODO i18n
                        //invalidMessage = 'Eingabe ungültig!';
                    }
                    else
                    {
                        invalidMessage = this.inputInvalidMessage;

                        this._alert.addAlert({
                                                 msg:              invalidMessage,
                                                 closable:         true,
                                                 type:             'danger',
                                                 dismissOnTimeout: 0
                                             });
                    }
                }
            }
        }
    }

    public get regex():string
    {
        return this._regex;
    }

    public set regex(value:string)
    {
        this._regex = value;
    }
}
