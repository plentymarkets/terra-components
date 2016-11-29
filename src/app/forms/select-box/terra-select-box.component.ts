import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';

@Component({
               selector:      'terra-select-box',
               styles:        [require('./terra-select-box.component.scss').toString()],
               template:      require('./terra-select-box.component.html'),
               encapsulation: ViewEncapsulation.None,
               host:          {
                   '(document:click)': 'clickedOutside($event)',
               }
           })

export class TerraSelectBoxComponent implements OnInit, OnChanges
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputDisabled:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string;
    @Input() inputListBoxValues:Array<TerraSelectBoxValueInterface>;
    @Output() outputValueChanged = new EventEmitter<TerraSelectBoxValueInterface>();
    @Output() inputSelectedValueChange = new EventEmitter<TerraSelectBoxValueInterface>();
    
    @Input()
    set inputSelectedValue(value:number | string)
    {
        if(value)
        {
            setTimeout(() => this.select(value));
        }
    }
    
    get inputSelectedValue():number | string
    {
        return this._selectedValue.value;
    }
    
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
        if(this.inputListBoxValues && this.inputListBoxValues.length > 0)
        {
            setTimeout(() => this.select(this.inputListBoxValues[0].value));
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
        if(this._isInit == true)
        {
            for(let key of Object.keys(changes))
            {
                if(key == "inputListBoxValues" && changes[key].currentValue.length > 0)
                {
                    setTimeout(() => this.select(changes[key].currentValue[0].value));
                    
                    changes[key].currentValue.forEach((item:TerraSelectBoxValueInterface) =>
                                                      {
                                                          if(item.active && item.active == true)
                                                          {
                                                              setTimeout(() => this.select(item.value));
                                                          }
                                                      });
                }
            }
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
    private select(value:number | string):void
    {
        for(let i = 0; i < this.inputListBoxValues.length; i++)
        {
            if(this.inputListBoxValues[i].value == value)
            {
                this._selectedValue.active = false;
                this._selectedValue = this.inputListBoxValues[i];
                this.outputValueChanged.emit(this.inputListBoxValues[i]);
                this.inputSelectedValueChange.emit(this.inputListBoxValues[i].value);
                
                return;
            }
        }
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
    
}
