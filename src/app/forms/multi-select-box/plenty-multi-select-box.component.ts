import
{
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { PlentyMultiSelectBoxValue } from './value/plenty-multi-select-box-value';
import { PlentyCheckbox } from '../checkbox/plenty-checkbox.component';


@Component({
               selector:      'plenty-multi-select-box',
               styles:        [require('./plenty-multi-select-box.component.scss').toString()],
               template:      require('./plenty-multi-select-box.component.html'),
               encapsulation: ViewEncapsulation.None
           })

export class PlentyMultiSelectBox implements OnInit
{
    @Input() inputIsDisabled:boolean;
    @Input() inputIsError:boolean;
    @Input() inputValueList:Array<PlentyMultiSelectBoxValue>;
    @ViewChild('headerCheckbox') headerCheckbox:PlentyCheckbox;
    
    private _isHeaderCheckboxChecked:boolean = false;
    private _selectedValueList:Array<PlentyMultiSelectBoxValue> = [];
    private _boxClassType:string = "";
    
    constructor()
    {
    }
    
    ngOnInit()
    {
        if(this.inputIsDisabled)
        {
            this._boxClassType = "disabled";
        }
        else if(this.inputIsError)
        {
            this._boxClassType = "error";
        }
    }
    
    private primaryClicked():void
    {
        this.onHeaderCheckboxChange(!this._isHeaderCheckboxChecked);
    }
    
    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        this._isHeaderCheckboxChecked = isChecked;
        
        this.inputValueList.forEach(
            (value)=>
            {
                this.changeValueState(isChecked, value);
            });
    }
    
    private onValueCheckboxChange(isChecked:boolean,
                                  value:PlentyMultiSelectBoxValue):void
    {
        this.changeValueState(isChecked, value);
        
        if(this._selectedValueList.length == 0)
        {
            this._isHeaderCheckboxChecked = false;
        }
        else if(this._selectedValueList.length > 0 && this.inputValueList.length == this._selectedValueList.length)
        {
            this._isHeaderCheckboxChecked = true;
        }
        else
        {
            this.headerCheckbox.isIndeterminate = true;
        }
    }
    
    private changeValueState(isChecked:boolean,
                             valueToChange:PlentyMultiSelectBoxValue):void
    {
        valueToChange.selected = isChecked;
        
        let valueFound:boolean = false;
        
        this._selectedValueList.forEach(
            (value)=>
            {
                if(value == valueToChange)
                {
                    valueFound = true;
                }
            });
        
        if(valueToChange.selected)
        {
            if(!valueFound)
            {
                this._selectedValueList.push(valueToChange);
            }
        }
        else
        {
            let index = this._selectedValueList.indexOf(valueToChange);
            
            this._selectedValueList.splice(index, 1);
        }
    }
}
