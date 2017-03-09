import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    forwardRef
} from '@angular/core';
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const SELECT_BOX_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraSelectBoxComponent),
    multi:       true
};

@Component({
               selector:  'terra-select-box',
               styles:    [require('./terra-select-box.component.scss')],
               template:  require('./terra-select-box.component.html'),
               host:      {
                   '(document:click)': 'clickedOutside($event)',
               },
               providers: [SELECT_BOX_VALUE_ACCESSOR]
           })
export class TerraSelectBoxComponent implements OnInit, OnChanges
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string;
    @Input() inputListBoxValues:Array<TerraSelectBoxValueInterface>;
    @Output() outputValueChanged = new EventEmitter<TerraSelectBoxValueInterface>();
    @Output() inputSelectedValueChange = new EventEmitter<TerraSelectBoxValueInterface>();
    
    
    /**
     * @deprecated
     * @param value
     */
    @Input()
    set inputSelectedValue(value:number | string)
    {
        console.warn('inputSelectedValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.')
        if(value !== undefined && value !== null)
        {
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
                         {
                             if(item.value == value)
                             {
                                 this._selectedValue = item;
                             }
                         });
            setTimeout(() => this.inputSelectedValueChange.emit(this._selectedValue.value), 0);
        }
    }
    
    get inputSelectedValue():number | string
    {
        return this._selectedValue.value;
    }
    
    private _value:number | string;
    private _selectedValue:TerraSelectBoxValueInterface;
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _isValid:boolean;
    private _regex:string;
    private _isInit:boolean;
    
    /**
     *
     * @param elementRef
     */
    constructor(private elementRef:ElementRef)
    {
        this._isInit = false;
        this.isValid = true;
        this.inputTooltipPlacement = 'top';
        this._selectedValue =
            {
                value:   '',
                caption: ''
            };
    }
    
    ngOnInit()
    {
        this._toggleOpen = false;
        this._hasLabel = this.inputName != null;
        this._isInit = true;
    }
    
    /**
     *
     * @param changes
     */
    ngOnChanges(changes:SimpleChanges)
    {
        if(this._isInit == true && changes["inputListBoxValues"] && changes["inputListBoxValues"].currentValue.length > 0)
        {
            setTimeout(() => this.select(this.inputListBoxValues[0]), 0);
        }
    }
    
    /**
     *
     * Two way data binding by ngModel
     */
    private onTouchedCallback:() => void = () =>
    {
    };
    
    private onChangeCallback:(_:any) => void = (_) =>
    {
    };
    
    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }
    
    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }
    
    public writeValue(value:any):void
    {
        this.value = value;
    }
    
    public get value():any
    {
        return this._value;
    }
    
    public set value(value:any)
    {
        this._value = value;
        
        if(value !== undefined && value !== null)
        {
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
                         {
                             if(item.value == value)
                             {
                                 this._selectedValue = item;
                             }
                         });
        }
        else
        {
            this._selectedValue = this.inputListBoxValues[0];
        }
    }
    
    /**
     *
     * @param event
     */
    private clickedOutside(event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this._toggleOpen = false;
        }
    }
    
    /**
     *
     * @param value
     */
    private select(value:TerraSelectBoxValueInterface):void
    {
        this._selectedValue = value;
        this.onTouchedCallback();
        this.onChangeCallback(value.value);
        this.outputValueChanged.emit(value);
    }
    
    /**
     *
     * @returns {boolean}
     */
    public get isDisabled():boolean
    {
        return this.inputIsDisabled;
    }
    
    /**
     *
     * @param value
     */
    public set isDisabled(value:boolean)
    {
        this.inputIsDisabled = value;
    }
    
    /**
     *
     * @returns {boolean}
     */
    public get isValid():boolean
    {
        return this._isValid;
    }
    
    /**
     *
     * @param isValid
     */
    public set isValid(isValid:boolean)
    {
        this._isValid = isValid;
    }
    
    /**
     *
     * @returns {string}
     */
    public get regex():string
    {
        return this._regex;
    }
    
    /**
     *
     * @param regex
     */
    public set regex(regex:string)
    {
        this._regex = regex;
    }
}
