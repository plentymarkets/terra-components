import { Component, OnInit } from '@angular/core';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

@Component({
    selector: 'tc-filter-example',
    templateUrl: './filter.component.example.html'
})
export class FilterComponentExample implements OnInit {
    public _name: string = '';

    public _listBoxValues: Array<TerraSelectBoxValueInterface> = [];
    public _selectedListBoxValue: number = 1;

    public ngOnInit(): void {
        for (let i: number = 1; i < 4; i++) {
            this._listBoxValues.push({
                value: i,
                caption: 'Test' + i
            });
        }
    }

    public _onSearchBtnClicked(): void {
        alert('filtered for ' + this._selectedListBoxValue);
    }

    public _onResetBtnClicked(): void {
        this._name = '';
        this._selectedListBoxValue = 1;
    }
}
