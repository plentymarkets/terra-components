import {
    Component,
    Input,
    forwardRef,
    Output,
    EventEmitter
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

export const CHECKBOX_CONTROL_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraCheckboxComponent),
    multi:       true
};

@Component({
               selector:  'terra-checkbox',
               styles:    [require('./terra-checkbox.component.scss')],
               template:  require('./terra-checkbox.component.html'),
               providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
           })

export class TerraCheckboxComponent implements ControlValueAccessor
{
    @Input() inputIsDisabled:boolean;
    @Input() inputCaption:string;
    @Input() inputId:string;
    @Output() valueChange:EventEmitter<boolean> = new EventEmitter<boolean>();
    
    //The internal data model
    private _innerValue:boolean = false;
    private _isIndeterminate:boolean = false;
    
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
            this.valueChange.emit(v);
            this.onChangeCallback(v);
        }
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
    
    public set isIndeterminate(value:boolean)
    {
        //TODO is this correct?
        this._innerValue = false;
        this._isIndeterminate = value;
    }
}
