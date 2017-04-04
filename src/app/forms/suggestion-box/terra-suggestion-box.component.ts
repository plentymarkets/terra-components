import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy,
    forwardRef
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from './data/terra-suggestion-box.interface';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const SUGGESTION_BOX_VALUE_ACCESSOR:any = {
    provide:     NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TerraSuggestionBoxComponent),
    multi:       true
};

//TODO in template input mit terra-input ersetzen
@Component({
               selector:        'terra-suggestion-box',
               styles:          [require('./terra-suggestion-box.component.scss')],
               template:        require('./terra-suggestion-box.component.html'),
               host:            {
                   '(document:click)': 'clickedOutside($event)',
               },
               providers: [SUGGESTION_BOX_VALUE_ACCESSOR],
               changeDetection: ChangeDetectionStrategy.OnPush
           })

export class TerraSuggestionBoxComponent implements OnInit, OnChanges
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputDisabled:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string;
    @Input() inputListBoxValues:Array<TerraSuggestionBoxValueInterface>;
    @Output() outputValueChanged = new EventEmitter<TerraSuggestionBoxValueInterface>();
    @Output() inputSelectedValueChange = new EventEmitter<TerraSuggestionBoxValueInterface>();
    
    /**
     * @deprecated
     * @param value
     */
    @Input()
    set inputSelectedValue(value:number | string)
    {
        console.warn('inputSelectedValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        if(value)
        {
            this.inputListBoxValues
                .forEach((item:TerraSuggestionBoxValueInterface) =>
                         {
                             if(item.value == value)
                             {
                                 this._selectedValue.active = false;
                                 item.active = true;
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
    
    private _selectedValue:TerraSuggestionBoxValueInterface;
    private _currentValue:TerraSuggestionBoxValueInterface;
    private tempInputListBoxValues:Array<TerraSuggestionBoxValueInterface> = [];
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _isValid:boolean;
    private _regex:string;
    private _isInit:boolean;
    private _value:number | string;
    
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
        this._currentValue =
            {
                value:   '',
                caption: ''
            };
        if(this.inputListBoxValues == null)
        {
            this.inputListBoxValues = [];
        }
    }
    
    ngOnInit()
    {
        if(this.inputListBoxValues && this.inputListBoxValues.length > 0)
        {
            let foundItem = false;
            
            for(let i = 0; i < this.inputListBoxValues.length; i++)
            {
                if(this.inputListBoxValues[i].active == true)
                {
                    this.select(this.inputListBoxValues[i]);
                    foundItem = true;
                }
            }
            
            if(foundItem == false)
            {
                //this.select(0);
            }
        }
        
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
            setTimeout(() => this.inputSelectedValue = changes["inputListBoxValues"].currentValue[0].value, 0);
            
            changes["inputListBoxValues"].currentValue
                                         .forEach((item:TerraSuggestionBoxValueInterface) =>
                                                  {
                                                      if(item.active && item.active == true)
                                                      {
                                                          setTimeout(() => this.inputSelectedValue = item.value, 0);
                                                      }
                                                  });
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
                .forEach((item:TerraSuggestionBoxValueInterface) =>
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
    private select(value:TerraSuggestionBoxValueInterface):void
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
        return this.inputDisabled;
    }
    
    /**
     *
     * @param value
     */
    public set isDisabled(value:boolean)
    {
        this.inputDisabled = value;
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
    
    /**
     *
     * @param
     */
    public onFocus()
    {
        this._toggleOpen = true;
    }
    
    /**
     *
     * @param
     */
    public onBlur()
    {
        this._toggleOpen = false;
    }
    
    /**
     *
     * @param
     */
    public onChange()
    {
        let currentList = [];
        let searchString = this._currentValue.caption;
        
        if(searchString)
        {
            if(this.tempInputListBoxValues != null && this.tempInputListBoxValues.length == 0)
            {
                this.tempInputListBoxValues = this.inputListBoxValues;
            }
    
            if(this._currentValue.caption.length >= 3)
            {
                for(let value in this.tempInputListBoxValues)
                {
                    if(this.tempInputListBoxValues[value].caption.search(searchString) != -1)
                    {
                        currentList.push(this.tempInputListBoxValues[value]);
                    }
                }
        
                this.inputListBoxValues = currentList;
            }
            else
            {
                this.inputListBoxValues = this.tempInputListBoxValues;
            }
    
            this.value = this._currentValue;
        }
        else
        {
            this.value = null;
            this.onTouchedCallback();
            this.onChangeCallback(null);
        }
    }
    
    /**
     *
     * @param
     */
    public resetComponentValue()
    {
        this._selectedValue =
            {
                value:   '',
                caption: ''
            };
        this._currentValue =
            {
                value:   '',
                caption: ''
            };
        this._value = null;
    }
}
