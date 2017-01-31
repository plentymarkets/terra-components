import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from './data/terra-suggestion-box.interface';

@Component({
               selector:        'terra-suggestion-box',
               styles:          [require('./terra-suggestion-box.component.scss').toString()],
               template:        require('./terra-suggestion-box.component.html'),
    //TODO in template input mit terra-input ersetzen
               encapsulation:   ViewEncapsulation.None,
               host:            {
                   '(document:click)': 'clickedOutside($event)',
               },
               changeDetection: ChangeDetectionStrategy.OnPush
           })

export class TerraSuggestionBoxComponent implements OnInit, OnChanges
{
    @Input() inputName: string;
    @Input() inputIsRequired: boolean;
    @Input() inputDisabled: boolean;
    @Input() inputTooltipText: string;
    @Input() inputTooltipPlacement: string;
    @Input() inputListBoxValues: Array<TerraSuggestionBoxValueInterface>;
    @Output() outputValueChanged = new EventEmitter<TerraSuggestionBoxValueInterface>();
    @Output() inputSelectedValueChange = new EventEmitter<TerraSuggestionBoxValueInterface>();
    
    @Input()
    set inputSelectedValue(value: number | string)
    {
        if(value)
        {
            this.inputListBoxValues
                .forEach((item: TerraSuggestionBoxValueInterface) =>
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
    
    get inputSelectedValue(): number | string
    {
        return this._selectedValue.value;
    }
    
    private _selectedValue: TerraSuggestionBoxValueInterface;
    private _currentValue: TerraSuggestionBoxValueInterface;
    private tempInputListBoxValues: Array<TerraSuggestionBoxValueInterface> = [];
    private _toggleOpen: boolean;
    private _hasLabel: boolean;
    private _isValid: boolean;
    private _regex: string;
    private _isInit: boolean;
    
    /**
     *
     * @param elementRef
     */
    constructor(private elementRef: ElementRef)
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
       if (this.inputListBoxValues == null)
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
                    this.select(i);
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
    ngOnChanges(changes: SimpleChanges)
    {
        if(this._isInit == true && changes["inputListBoxValues"] && changes["inputListBoxValues"].currentValue.length > 0)
        {
            setTimeout(() => this.inputSelectedValue = changes["inputListBoxValues"].currentValue[0].value, 0);
            
            changes["inputListBoxValues"].currentValue
                                         .forEach((item: TerraSuggestionBoxValueInterface) =>
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
    private clickedOutside(event): void
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
    private select(index: number): void
    {
        if(this.inputListBoxValues.length > 0)
        {
            this._selectedValue.active = false;
            this._selectedValue = this.inputListBoxValues[index];
            this.outputValueChanged.emit(this.inputListBoxValues[index]);
            this.inputSelectedValue = this.inputListBoxValues[index].value;
        }
        this._toggleOpen = !this._toggleOpen;
    }
    
    /**
     *
     * @returns {boolean}
     */
    public get isDisabled(): boolean
    {
        return this.inputDisabled;
    }
    
    /**
     *
     * @param value
     */
    public set isDisabled(value: boolean)
    {
        this.inputDisabled = value;
    }
    
    /**
     *
     * @returns {boolean}
     */
    public get isValid(): boolean
    {
        return this._isValid;
    }
    
    /**
     *
     * @param isValid
     */
    public set isValid(isValid: boolean)
    {
        this._isValid = isValid;
    }
    
    /**
     *
     * @returns {string}
     */
    public get regex(): string
    {
        return this._regex;
    }
    
    /**
     *
     * @param regex
     */
    public set regex(regex: string)
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
    }
}