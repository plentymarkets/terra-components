import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    ViewChild
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
    IMyDateModel,
    IMyOptions,
    MyDatePicker
} from 'mydatepicker';

/**
 * @author mfrank
 */
@Component({
               selector:  'terra-date-picker',
               styles:    [require('./terra-date-picker.component.scss')],
               template:  require('./terra-date-picker.component.html'),
               providers: [
                   {
                       provide:     NG_VALUE_ACCESSOR,
                       useExisting: forwardRef(() => TerraDatePickerComponent),
                       multi:       true
                   }
               ]
           })
export class TerraDatePickerComponent implements OnChanges, ControlValueAccessor
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputIsValid:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputOpenCalendarTop:boolean;
    
    @ViewChild('viewChildMyDatePicker') viewChildMyDatePicker:MyDatePicker;
    
    private onTouchedCallback:() => void = () =>
    {
    };
    
    private onChangeCallback:(_:any) => void = (_) =>
    {
    };
    
    private _value:number;
    private _myDateModel:IMyDateModel;
    private _currentLocale:string;
    private _datePickerOptions:IMyOptions;
    
    constructor()
    {
        this.inputIsRequired = false;
        this.inputIsDisabled = false;
        this.inputIsValid = true;
        this.inputOpenCalendarTop = false;
        
        this._currentLocale = localStorage.getItem('plentymarkets_lang_');
    }
    
    ngOnChanges()
    {
        this.updateDatePickerOptions();
    }
    
    private updateDatePickerOptions():void
    {
        this._datePickerOptions = {
            height:                   'inherit',
            //inputValueRequired:       this.inputIsRequired,
            componentDisabled:        this.inputIsDisabled,
            openSelectorTopOfInput:   this.inputOpenCalendarTop,
            showSelectorArrow:        !this.inputOpenCalendarTop,
            inline:                   false,
            editableDateField:        true,
            openSelectorOnInputClick: false
        };
    }
    
    public writeValue(value:any):void
    {
        this.value = value;
    }
    
    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }
    
    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }
    
    public get value():any
    {
        return this._value;
    }
    
    public set value(value:any)
    {
        if(value != null)
        {
            
            this._value = value;
            
            let momentDate:Date = new Date(value * 1000);
            
            this.myDateModel = {
                date:      {
                    year:  momentDate.getFullYear(),
                    month: momentDate.getMonth() + 1,
                    day:   momentDate.getDate()
                },
                jsdate:    momentDate,
                formatted: '',
                epoc:      value
            };
        }
        else
        {
            this.viewChildMyDatePicker.clearDate();
        }
    }
    
    public get myDateModel():IMyDateModel
    {
        return this._myDateModel;
    }
    
    public set myDateModel(value:IMyDateModel)
    {
        this._myDateModel = value;
        
        if(this.myDateModel.epoc === 0)
        {
            this.myDateModel.date = null;
        }
        
        this.onTouchedCallback();
        this.onChangeCallback(this.myDateModel.epoc);
    }
    
    public onDateChanged(event:IMyDateModel):void
    {
        this.myDateModel = event;
    }
    
    public clearDate():void
    {
        this.viewChildMyDatePicker.clearDate();
    }
}
    
