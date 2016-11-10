import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    ViewEncapsulation
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

export class TerraSelectBoxComponent implements OnInit
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputDisabled:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string;
    @Input() inputListBoxValues:Array<TerraSelectBoxValueInterface>;
    @Input() inputDefaultSelection:number | string;
    @Output() outputValueChanged = new EventEmitter<TerraSelectBoxValueInterface>();
    
    private _selectedValue:TerraSelectBoxValueInterface;
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _isValid:boolean;
    private _regex:string;
    
    /**
     *
     * @param elementRef
     */
    constructor(private elementRef:ElementRef)
    {
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
        if(this.inputDefaultSelection)
        {
            this.inputListBoxValues
                .forEach((value:TerraSelectBoxValueInterface) =>
                         {
                             if(value.value == this.inputDefaultSelection)
                             {
                                 value.active = true;
                                 this._selectedValue = value
                             }
                         });
        }
        else
        {
            if(this.inputListBoxValues != null && this.inputListBoxValues.length > 0)
            {
                this.inputListBoxValues[0].active = true;
                this._selectedValue = this.inputListBoxValues[0];
            }
        }
        
        this._toggleOpen = false;
        this._hasLabel = this.inputName != null;
    }
    
    /**
     *
     * @param event
     */
    private clickedOutside(event):void
    {
        if(!this.elementRef.nativeElement.contains(event.viewChildTarget))
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
        this._selectedValue.active = false;
        value.active = true;
        this._selectedValue = value;
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
    
}
