import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

let nextId:number = 0;

@Component({
    selector:  'terra-checkbox',
    styles:    [require('./terra-checkbox.component.scss')],
    template:  require('./terra-checkbox.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraCheckboxComponent),
            multi:       true
        }
    ]
})
export class TerraCheckboxComponent implements ControlValueAccessor
{
    /**
     * @description If true, the check box will be disabled. Default false.
     * */
    @Input() inputIsDisabled:boolean;
    /**
     * @description Set the caption.
     * */
    @Input() inputCaption:string;
    /**
     * @description Set an icon (e.g. icon-save).
     * */
    @Input() inputIcon:string;
    /**
     * @description Set the id.
     * */
    @Input() inputId:string;

    @Output() valueChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * @description a unique string identifier for the specific input instance.
     */
    private _id:string;

    //The internal data model
    private _innerValue:boolean = false;
    private _isIndeterminate:boolean = false;
    private _isValid:boolean = true;

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback:() => void = () =>
    {
    };

    private onChangeCallback:(_:any) => void = (_) =>
    {
    };

    constructor()
    {
        // generate the id of the input instance
        this._id = `checkbox_#${nextId++}`;
    }

    //get accessor
    public get value():boolean
    {
        return this._innerValue;
    };

    //set accessor including call the onchange callback
    @Input()
    public set value(v:boolean)
    {
        this._isIndeterminate = false;

        if(v !== this._innerValue)
        {
            this._innerValue = v;
            this.onChangeCallback(v);
        }
    }

    onChange()
    {
        this.valueChange.emit(null);
    }

    //From ControlValueAccessor interface
    writeValue(value:boolean)
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

    public get isIndeterminate():boolean
    {
        return this._isIndeterminate;
    }

    @Input()
    public set isIndeterminate(value:boolean)
    {
        if(value)
        {
            this._innerValue = false;
        }
        this._isIndeterminate = value;
    }

    public get isValid():boolean
    {
        return this._isValid;
    }

    public set isValid(value:boolean)
    {
        this._isValid = value;
    }
}
