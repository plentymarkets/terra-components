import {
    Component,
    OnInit,
    Input,
    Output,
    ElementRef,
    EventEmitter
} from '@angular/core';
import { PlentySelectBoxValue } from './value/plenty-select-box-value';

@Component({
               selector: 'plenty-select-box',
               styles:   [require('./plenty-select-box.component.scss')],
               template: require('./plenty-select-box.component.html'),
               host:     {
                   '(document:click)': 'clickedOutside($event)',
               }
           })
export class PlentySelectBox implements OnInit
{
    @Input() name:string;
    @Input() isRequired:boolean;
    @Input() disabled:boolean;
    @Input() tooltipText:string;
    @Input() tooltipPlacement:string;
    @Input() listBoxValues:Array<PlentySelectBoxValue>;
    @Input() defaultSelection:number | string;
    @Output() valueChanged = new EventEmitter<PlentySelectBoxValue>();

    private selectedValue:PlentySelectBoxValue;
    private toggleOpen:boolean;
    private hasLabel:boolean;
    private _isValid:boolean;
    private _regex:string;

    /**
     *
     * @param elementRef
     */
    constructor(private elementRef:ElementRef)
    {
        this.isValid = true;
        this.tooltipPlacement = 'top';
    }

    ngOnInit()
    {
        if(this.defaultSelection)
        {
            this.listBoxValues
                .forEach((value:PlentySelectBoxValue) =>
                         {
                             if(value.value == this.defaultSelection)
                             {
                                 value.active = true;
                                 this.selectedValue = value
                             }
                         });
        }
        else
        {
            this.listBoxValues[0].active = true;
            this.selectedValue = this.listBoxValues[0];
        }

        this.toggleOpen = false;
        this.hasLabel = this.name != null;
    }

    /**
     *
     * @param event
     */
    private clickedOutside(event):void
    {
        if(!this.elementRef.nativeElement.contains(event.target))
        {
            this.toggleOpen = false;
        }
    }

    /**
     *
     * @param value
     */
    private select(value:PlentySelectBoxValue):void
    {
        this.selectedValue.active = false;
        value.active = true;
        this.selectedValue = value;
        this.valueChanged.emit(value);
    }

    /**
     *
     * @returns {boolean}
     */
    public get isDisabled():boolean
    {
        return this.disabled;
    }

    /**
     *
     * @param value
     */
    public set isDisabled(value:boolean)
    {
        this.disabled = value;
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
