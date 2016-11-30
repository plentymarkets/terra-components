import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { TerraMultiSelectBoxValueInterface } from './data/terra-multi-select-box-value.interface';
import { TerraCheckboxComponent } from '../checkbox/terra-checkbox.component';
import {
    Locale,
    LocaleService,
    LocalizationService
} from 'angular2localization';


@Component({
               selector:      'terra-multi-select-box',
               styles:        [require('./terra-multi-select-box.component.scss').toString()],
               template:      require('./terra-multi-select-box.component.html'),
               encapsulation: ViewEncapsulation.None
           })

export class TerraMultiSelectBoxComponent extends Locale implements OnInit
{
    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;
    @Input() inputIsDisabled:boolean;
    @Input() inputIsError:boolean;
    @Input() inputValueList:Array<TerraMultiSelectBoxValueInterface>;
    
    @Input()
    set inputSelectedValue(value:Array<any>)
    {
        if(value)
        {
            
        }
    }
    
    get inputSelectedValue():Array<any>
    {
        let result:Array<any> = [];
        
        this._selectedValueList
            .forEach((item)=>
                     {
                         if(item.selected == true)
                         {
                             result.push(item.value);
                         }
                     });
        
        return result;
    }
    
    private _selectedValueList:Array<TerraMultiSelectBoxValueInterface> = [];
    private _boxClassType:string = "";
    
    constructor(public locale:LocaleService, localization:LocalizationService)
    {
        super(locale, localization);
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
        this.onHeaderCheckboxChange(!this.viewChildHeaderCheckbox.value);
    }
    
    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        this.viewChildHeaderCheckbox.value = isChecked;
        
        this.inputValueList.forEach(
            (value)=>
            {
                this.changeValueState(isChecked, value);
            });
    }
    
    private onValueCheckboxChange(isChecked:boolean,
                                  value:TerraMultiSelectBoxValueInterface):void
    {
        this.changeValueState(isChecked, value);
        
        if(this._selectedValueList.length == 0)
        {
            this.viewChildHeaderCheckbox.value = false;
        }
        else if(this._selectedValueList.length > 0 && this.inputValueList.length == this._selectedValueList.length)
        {
            this.viewChildHeaderCheckbox.value = true;
        }
        else
        {
            this.viewChildHeaderCheckbox.isIndeterminate = true;
        }
    }
    
    private changeValueState(isChecked:boolean,
                             valueToChange:TerraMultiSelectBoxValueInterface):void
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
    
    public get selectedValueList():Array<TerraMultiSelectBoxValueInterface>
    {
        return this._selectedValueList;
    }
    
    public get boxClassType():string
    {
        return this._boxClassType;
    }
    
    public set boxClassType(value:string)
    {
        this._boxClassType = value;
    }
}
