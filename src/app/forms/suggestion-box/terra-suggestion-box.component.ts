import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from './data/terra-suggestion-box.interface';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
               selector:  'terra-suggestion-box',
               styles:    [require('./terra-suggestion-box.component.scss')],
               template:  require('./terra-suggestion-box.component.html'),
               providers: [
                   {
                       provide:     NG_VALUE_ACCESSOR,
                       useExisting: forwardRef(() => TerraSuggestionBoxComponent),
                       multi:       true
                   }
               ]
           })
export class TerraSuggestionBoxComponent implements OnInit, OnChanges
{
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string;
    @Input() inputListBoxValues:Array<TerraSuggestionBoxValueInterface>;
    @Output() outputValueChanged = new EventEmitter<TerraSuggestionBoxValueInterface>();
    @Output() inputSelectedValueChange = new EventEmitter<TerraSuggestionBoxValueInterface>();

    private _selectedValue:TerraSuggestionBoxValueInterface;
    private _currentValue:TerraSuggestionBoxValueInterface;
    private _toggleOpen:boolean;
    private _hasLabel:boolean;
    private _isValid:boolean;
    private _isInit:boolean;
    private _value:number | string;
    private clickListener:(event:Event) => void;

    /**
     *
     * @param elementRef
     */
    constructor(private elementRef:ElementRef)
    {
        this.clickListener = (event) =>
        {
            this.clickedOutside(event);
        };

        this._isInit = false;
        this.inputTooltipPlacement = 'top';
        this._selectedValue =
            {
                value:   '',
                caption: ''
            };
        //
        //this._currentValue =
        //    {
        //        value:   '',
        //        caption: ''
        //    };
    }

    public get isValid():boolean
    {
        return this._isValid;
    }

    public set isValid(value:boolean)
    {
        this._isValid = value;
    }

    ngOnInit()
    {
        //if(this.inputListBoxValues && this.inputListBoxValues.length > 0)
        //{
        //    let foundItem = false;
        //
        //    for(let i = 0; i < this.inputListBoxValues.length; i++)
        //    {
        //        if(this.inputListBoxValues[i].active == true)
        //        {
        //            this.select(this.inputListBoxValues[i]);
        //            foundItem = true;
        //        }
        //    }
        //
        //    if(foundItem == false)
        //    {
        //        //this.select(0);
        //    }
        //}

        this._isValid = true;
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
        if(this._isInit == true
           && changes["inputListBoxValues"]
           && changes["inputListBoxValues"].currentValue.length > 0
           && this.inputListBoxValues.indexOf(this._selectedValue) == -1)
        {
            this.select(this.inputListBoxValues[0]);
        }
    }

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

        if(!isNullOrUndefined(value))
        {
            this.inputListBoxValues
                .forEach((item:TerraSuggestionBoxValueInterface) =>
                         {
                             if(item.value == value)
                             {
                                 this._selectedValue = {
                                     caption: item.caption,
                                     value:   item.value
                                 };
                             }
                         });
        }
        else
        {
            this._selectedValue = {
                caption: this.inputListBoxValues[0].caption,
                value:   this.inputListBoxValues[0].value
            };
        }
    }

    private onClick(evt:Event):void
    {
        evt.stopPropagation(); // prevents the click listener on the document to be fired right after
        this.toggleOpen = !this.toggleOpen;
    }

    public set toggleOpen(value:boolean)
    {
        if(this._toggleOpen !== value && value == true)
        {
            document.addEventListener('click', this.clickListener);
        }
        else if(this._toggleOpen !== value && value == false)
        {
            document.removeEventListener('click', this.clickListener);
        }

        this._toggleOpen = value;
    }

    public get toggleOpen():boolean
    {
        return this._toggleOpen;
    }

    private clickedOutside(event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    private select(value:TerraSuggestionBoxValueInterface):void
    {
        this._selectedValue = {
            caption: value.caption,
            value:   value.value
        };
        this.onTouchedCallback();
        this.onChangeCallback(value.value);
        this.outputValueChanged.emit(value);
    }


    //public onChange()
    //{
    //    let currentList = [];
    //    let searchString = this._currentValue.caption;
    //
    //    if(searchString)
    //    {
    //        if(this.tempInputListBoxValues != null && this.tempInputListBoxValues.length == 0)
    //        {
    //            this.tempInputListBoxValues = this.inputListBoxValues;
    //        }
    //
    //        if(this._currentValue.caption.length >= 3)
    //        {
    //            for(let value in this.tempInputListBoxValues)
    //            {
    //                if(this.tempInputListBoxValues[value].caption.search(searchString) != -1)
    //                {
    //                    currentList.push(this.tempInputListBoxValues[value]);
    //                }
    //            }
    //
    //            this.inputListBoxValues = currentList;
    //        }
    //        else
    //        {
    //            this.inputListBoxValues = this.tempInputListBoxValues;
    //        }
    //
    //        this.value = this._currentValue;
    //    }
    //    else
    //    {
    //        this.value = null;
    //        this.onTouchedCallback();
    //        this.onChangeCallback(null);
    //        this.toggleOpen = false;
    //    }
    //}
    //
    //public resetComponentValue():void
    //{
    //    this.value = null;
    //
    //    this._selectedValue =
    //        {
    //            value:   '',
    //            caption: ''
    //        };
    //    this._currentValue =
    //        {
    //            value:   '',
    //            caption: ''
    //        };
    //    this._value = null;
    //}
}
