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
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
               selector:  'terra-select-box',
               styles:    [require('./terra-select-box.component.scss')],
               template:  require('./terra-select-box.component.html'),
               providers: [
                   {
                       provide:     NG_VALUE_ACCESSOR,
                       useExisting: forwardRef(() => TerraSelectBoxComponent),
                       multi:       true
                   }
               ]
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

    private clickListener:(event:Event) => void;

    /**
     * @deprecated
     * @param value
     */
    @Input()
    set inputSelectedValue(value:number | string)
    {
        console.warn('inputSelectedValue is deprecated. It will be removed in one of the upcoming releases. Please use ngModel instead.');
        if(value !== undefined && value != null)
        {
            this.inputListBoxValues
                .forEach((item:TerraSelectBoxValueInterface) =>
                         {
                             if(item.value == value)
                             {
                                 this._selectedValue = item;
                             }
                         });

            this.inputSelectedValueChange.emit(this._selectedValue.value);
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
    private _isInit:boolean;

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
    }

    ngOnInit()
    {
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

        if(value !== undefined && value != null)
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

    public get isValid():boolean
    {
        return this._isValid;
    }

    public set isValid(value:boolean)
    {
        this._isValid = value;
    }

    private set toggleOpen(value)
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

    private get toggleOpen():boolean
    {
        return this._toggleOpen;
    }

    /**
     *
     * @param event
     */
    private clickedOutside(event:Event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    private onClick(evt:Event):void
    {
        evt.stopPropagation(); // prevents the click listener on the document to be fired right after
        this.toggleOpen = !this.toggleOpen;
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
}
