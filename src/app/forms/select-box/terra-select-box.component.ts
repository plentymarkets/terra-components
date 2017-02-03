import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';

@Component({
               selector:        'terra-select-box',
               styles:          [require('./terra-select-box.component.scss')],
               template:        require('./terra-select-box.component.html'),
               host:            {
                   '(document:click)': 'clickedOutside($event)',
               },
               changeDetection: ChangeDetectionStrategy.OnPush
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
    
    @Input()
    set inputSelectedValue(value:number | string)
    {
        if(value)
        {
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
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
            let foundItem = false;
            
            for(let i = 0; i < this.inputListBoxValues.length; i++)
            {
                if(this.inputListBoxValues[i].active == true)
                {
                    this.select(i);
                    foundItem = true;
                }
            }
            
            //if(foundItem == false)
            //{
            //    this.select(0);
            //}
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
                                         .forEach((item:TerraSelectBoxValueInterface) =>
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
    private select(index:number):void
    {
        if(this.inputListBoxValues.length > 0)
        {
            this._selectedValue.active = false;
            this._selectedValue = this.inputListBoxValues[index];
            this.outputValueChanged.emit(this.inputListBoxValues[index]);
            this.inputSelectedValue = this.inputListBoxValues[index].value;
        }
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
