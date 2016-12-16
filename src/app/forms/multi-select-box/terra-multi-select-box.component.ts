import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ViewEncapsulation,
    Output,
    EventEmitter,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { TerraMultiSelectBoxValueInterface } from './data/terra-multi-select-box-value.interface';
import { TerraCheckboxComponent } from '../checkbox/terra-checkbox.component';
import {
    Locale,
    LocaleService,
    LocalizationService
} from 'angular2localization';
import {
    isBlank
} from '@angular/core/src/facade/lang';


@Component({
               selector:      'terra-multi-select-box',
               styles:        [require('./terra-multi-select-box.component.scss').toString()],
               template:      require('./terra-multi-select-box.component.html'),
               encapsulation: ViewEncapsulation.None
           })

export class TerraMultiSelectBoxComponent extends Locale implements OnInit, OnChanges
{
    @ViewChild('viewChildHeaderCheckbox') viewChildHeaderCheckbox:TerraCheckboxComponent;
    @Input() inputIsDisabled:boolean;
    @Input() inputIsError:boolean;
    @Input() inputValueList:Array<TerraMultiSelectBoxValueInterface>;
    @Input() inputName:string;
    @Input() inputIsRequired:boolean;
    @Output() inputSelectedValueListChange = new EventEmitter<Array<any>>();
    
    @Input()
    set inputSelectedValueList(value:Array<any>)
    {
        if(value)
        {
            let valueCopy = value.slice(0);
            
            if(valueCopy.length == 0)
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
            
            for(let i = this._selectedValueList.length; i >= 0; i--)
            {
                this._selectedValueList.pop();
            }
            
            this.inputValueList
                .forEach((item:TerraMultiSelectBoxValueInterface)=>
                         {
                             item.selected = false;
                             
                             valueCopy.forEach((key) =>
                                               {
                                                   if(item.value == key)
                                                   {
                                                       item.selected = true;
                                                       this._selectedValueList.push(item.value);
                                                       return;
                                                   }
                                               });
                         });
            
            setTimeout(()=> this.inputSelectedValueListChange.emit(this._selectedValueList), 0);
        }
    }
    
    private _selectedValueList:Array<any> = [];
    private _boxClassType:string = "";
    private _hasLabel:boolean;
    private _isInit:boolean;
    
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
    
        this._hasLabel = this.inputName != null;
        this._isInit = true;
    }
    
    /**
     *
     * @param changes
     */
    ngOnChanges(changes:SimpleChanges)
    {
        if(this._isInit == true && changes["inputValueList"] && changes["inputValueList"].currentValue.length > 0)
        {
            let temp:Array<any> = [];
            
            changes["inputValueList"].currentValue
                                     .forEach((item:TerraMultiSelectBoxValueInterface) =>
                                              {
                                                  if(item.selected && item.selected == true)
                                                  {
                                                      temp.push(item.value);
                                                  }
                                              });
            
            if(temp.length == 0)
            {
                temp.push(changes["inputValueList"].currentValue[0].value);
            }
            
            setTimeout(() => this.inputSelectedValueList = temp, 0);
        }
    }
    
    private primaryClicked():void
    {
        this.onHeaderCheckboxChange(!this.viewChildHeaderCheckbox.value);
    }
    
    private onHeaderCheckboxChange(isChecked:boolean):void
    {
        this.viewChildHeaderCheckbox.value = isChecked;
        
        this.inputValueList
            .forEach((value)=>
                     {
                         this.changeValueState(isChecked, value);
                     });
        
        this.inputSelectedValueList = this._selectedValueList;
    }
    
    private onValueCheckboxChange(isChecked:boolean, value:TerraMultiSelectBoxValueInterface):void
    {
        this.changeValueState(isChecked, value);
        this.inputSelectedValueList = this._selectedValueList;
        
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
    
    private changeValueState(isChecked:boolean, valueToChange:TerraMultiSelectBoxValueInterface):void
    {
        valueToChange.selected = isChecked;
        
        let valueFound:boolean = false;
        
        let index = this._selectedValueList.indexOf(valueToChange.value);
        let valueIdentifier = 'entry'+valueToChange.value;
        
        //check if value exists in list
        if(index == -1)
        {
            valueFound = false;
        }
        else
        {
            valueFound = !isBlank(this._selectedValueList[index]);
        }
        
        if(valueToChange.selected)
        {
            if(!valueFound)
            {
                this._selectedValueList.push(valueToChange.value);
            }
        }
        else
        {
            let index = this._selectedValueList.indexOf(valueToChange.value);

            this._selectedValueList.splice(index, 1);
        }
    }
    
    private extractSelectedValues(valueList:Array<TerraMultiSelectBoxValueInterface>)
    {
        let result:Array<any> = [];
        
        if(valueList && valueList.length > 0)
        {
            valueList
                .forEach((item:TerraMultiSelectBoxValueInterface)=>
                         {
                             if(item.selected == true)
                             {
                                 result.push(item.value);
                             }
                         });
        }
        
        return result;
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
