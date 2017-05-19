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
    @Input() inputIsDisabled:boolean;
    @Input() inputCaption:string;
    @Input() inputIcon:string;
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
    
    public set isIndeterminate(value:boolean)
    {
        //TODO is this correct?
        this._innerValue = false;
        this._isIndeterminate = value;
    }
}
