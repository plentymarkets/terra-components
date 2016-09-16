import {
    Component,
    Input,
    forwardRef
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

const noop = () => {
};

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlentyCheckbox),
    multi:       true
};

@Component({
               selector:    'plenty-plenty-checkbox',
               templateUrl: './plenty-checkbox.component.html',
               styleUrls:   ['./plenty-checkbox.component.css'],
               providers:   [CHECKBOX_CONTROL_VALUE_ACCESSOR]
           })
export class PlentyCheckbox implements ControlValueAccessor
{
    @Input() isDisabled: boolean;
    @Input() caption: string;
    //The internal data model
    private _innerValue: boolean = false;
    private _isIndeterminate = false;

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (v: any) => void = noop;

    constructor()
    {
    }

    //get accessor
    @Input()
    public get value(): boolean
    {
        return this._innerValue;
    };

    //set accessor including call the onchange callback
    public set value(v: boolean)
    {
        this.isIndeterminate = false;

        if(v !== this.value)
        {
            this.value = v;
            this.onChangeCallback(v);
        }
    }

    //From ControlValueAccessor interface
    writeValue(value: boolean)
    {
        if(value !== this.value)
        {
            this.value = value;
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

    public get isIndeterminate(): boolean
    {
        return this._isIndeterminate;
    }

    public set isIndeterminate(value: boolean)
    {
        //TODO is this correct?
        this.value = false;
        this._isIndeterminate = value;
    }
}
