import
{
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { PlentyMultiSelectBoxValue } from './value/plenty-multi-select-box-value';
import { PlentyCheckbox } from '../checkbox/plenty-checkbox.component';

@Component({
               selector:      'plenty-multi-select-box',
               templateUrl:   require('./plenty-multi-select-box.component.html'),
               styleUrls:     [require('./plenty-multi-select-box.component.scss')],
               encapsulation: ViewEncapsulation.None
           })

export class PlentyMultiSelectBox implements OnInit
{
    @Input() isDisabled: boolean;
    @Input() isError: boolean;
    @Input() valueList: Array<PlentyMultiSelectBoxValue>;
    @ViewChild('headerCheckbox') headerCheckbox: PlentyCheckbox;

    private isHeaderCheckboxChecked: boolean = false;
    private selectedValueList: Array<PlentyMultiSelectBoxValue> = [];
    private boxClassType: string = "";

    constructor()
    {
    }

    ngOnInit()
    {
        if(this.isDisabled)
        {
            this.boxClassType = "disabled";
        }
        else if(this.isError)
        {
            this.boxClassType = "error";
        }
    }

    private primaryClicked(): void
    {
        this.onHeaderCheckboxChange(!this.isHeaderCheckboxChecked);
    }

    private onHeaderCheckboxChange(isChecked: boolean): void
    {
        this.isHeaderCheckboxChecked = isChecked;

        this.valueList.forEach(
            (value)=>
            {
                this.changeValueState(isChecked, value);
            });
    }

    private onValueCheckboxChange(isChecked: boolean,
                                  value: PlentyMultiSelectBoxValue): void
    {
        this.changeValueState(isChecked, value);

        if(this.selectedValueList.length == 0)
        {
            this.isHeaderCheckboxChecked = false;
        }
        else if(this.selectedValueList.length > 0 && this.valueList.length == this.selectedValueList.length)
        {
            this.isHeaderCheckboxChecked = true;
        }
        else
        {
            this.headerCheckbox.isIndeterminate = true;
        }
    }

    private changeValueState(isChecked: boolean,
                             valueToChange: PlentyMultiSelectBoxValue): void
    {
        valueToChange.selected = isChecked;

        let valueFound: boolean = false;

        this.selectedValueList.forEach(
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
                this.selectedValueList.push(valueToChange);
            }
        }
        else
        {
            let index = this.selectedValueList.indexOf(valueToChange);

            this.selectedValueList.splice(index, 1);
        }
    }
}
