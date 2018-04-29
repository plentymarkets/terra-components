import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { TerraMultiSelectBoxValueInterface } from './data/terra-multi-select-box-value.interface';
import { TerraCheckboxComponent } from '../checkbox/terra-checkbox.component';
import { TranslationService } from 'angular-l10n';
import {
    isNull,
    isNullOrUndefined
} from 'util';

/** @deprecated - please use `TerraMultiCheckBoxComponent` instead */
@Component({
    selector: 'terra-multi-select-box',
    styles:   [require('./terra-multi-select-box.component.scss')],
    template: require('./terra-multi-select-box.component.html')
})
export class TerraMultiSelectBoxComponent implements OnInit, OnChanges
{
    @ViewChild('viewChildHeaderCheckbox')
    public viewChildHeaderCheckbox:TerraCheckboxComponent;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputIsError:boolean;

    @Input()
    public inputValueList:Array<TerraMultiSelectBoxValueInterface>;

    @Input()
    public inputName:string;

    @Input()
    public inputIsRequired:boolean;

    @Output()
    public inputSelectedValueListChange:EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    @Input()
    public set inputSelectedValueList(value:Array<any>)
    {
        if(!isNullOrUndefined(value))
        {
            let valueCopy:any = value.slice(0);

            if(valueCopy.length === 0)
            {
                this.viewChildHeaderCheckbox.value = false;
            }
            else if(this._selectedValueList.length > 0 && this.inputValueList.length === this._selectedValueList.length)
            {
                this.viewChildHeaderCheckbox.value = true;
            }
            else
            {
                this.viewChildHeaderCheckbox.isIndeterminate = true;
            }

            for(let i:number = this._selectedValueList.length; i >= 0; i--)
            {
                this._selectedValueList.pop();
            }

            this.inputValueList
                .forEach((item:TerraMultiSelectBoxValueInterface) =>
                {
                    item.selected = false;

                    valueCopy.forEach((key:any) =>
                    {
                        if(item.value === key)
                        {
                            item.selected = true;
                            this._selectedValueList.push(item.value);
                            return;
                        }
                    });
                });

            setTimeout(() => this.inputSelectedValueListChange.emit(this._selectedValueList), 0);
        }
    }

    private _selectedValueList:Array<any> = [];
    private _isInit:boolean;

    private _langPrefix:string = 'terraMultiSelectBox';

    constructor(public translation:TranslationService)
    {
        console.warn('TerraMultiSelectBoxComponent is deprecated. It will be removed in one of the upcoming releases' +
                     'Please use TerraMultiCheckBoxComponent instead.');
    }

    public ngOnInit():void
    {
        if(!this.inputName)
        {
            this.inputName = this.translation.translate(this._langPrefix + '.selectAll');

            // this is necessary for language switch
            this.translation.translationChanged().subscribe(() =>
            {
                this.inputName = this.translation.translate(this._langPrefix + '.selectAll');
            });
        }

        this._isInit = true;
    }

    /**
     *
     * @param changes
     */
    public ngOnChanges(changes:SimpleChanges):void
    {
        if(this._isInit === true && changes['inputValueList'] && changes['inputValueList'].currentValue.length > 0)
        {
            let temp:Array<any> = [];

            changes['inputValueList'].currentValue.forEach((item:TerraMultiSelectBoxValueInterface) =>
            {
                if(item.selected && item.selected === true)
                {
                    temp.push(item.value);
                }
            });

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

        this.inputValueList.forEach((value:TerraMultiSelectBoxValueInterface) =>
        {
            this.changeValueState(isChecked, value);
        });

        this.inputSelectedValueList = this._selectedValueList;
    }

    private onValueCheckboxChange(isChecked:boolean, value:TerraMultiSelectBoxValueInterface):void
    {
        this.changeValueState(isChecked, value);
        this.inputSelectedValueList = this._selectedValueList;

        if(this._selectedValueList.length === 0)
        {
            this.viewChildHeaderCheckbox.value = false;
        }
        else if(this._selectedValueList.length > 0 && this.inputValueList.length === this._selectedValueList.length)
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

        let index:number = this._selectedValueList.indexOf(valueToChange.value);

        // check if value exists in list
        if(index === -1)
        {
            valueFound = false;
        }
        else
        {
            valueFound = !isNull(this._selectedValueList[index]);
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
            index = this._selectedValueList.indexOf(valueToChange.value);

            this._selectedValueList.splice(index, 1);
        }
    }

    private extractSelectedValues(valueList:Array<TerraMultiSelectBoxValueInterface>):Array<any>
    {
        let result:Array<any> = [];

        if(valueList && valueList.length > 0)
        {
            valueList.forEach((item:TerraMultiSelectBoxValueInterface) =>
            {
                if(item.selected === true)
                {
                    result.push(item.value);
                }
            });
        }

        return result;
    }
}
