import { Component, OnInit } from '@angular/core';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

@Component({
    selector: 'terra-filter-example',
    styleUrls: ['./terra-filter.component.example.scss'],
    templateUrl: './terra-filter.component.example.html'
})
export class TerraFilterComponentExample implements OnInit {
    public _name: string = '';

    public _listBoxValues: Array<TerraSelectBoxValueInterface> = [];
    public _selectedListBoxValue: number = 1;

    public ngOnInit(): void {
        for (let i: number = 1; i < 4; i++) {
            this._listBoxValues.push({
                value: 'test' + i,
                caption: 'Test' + i
            });
        }
    }

    public _onResetBtnClicked(): void {
        return;
    }

    public _onSubmit(): void {
        this._onSearchBtnClicked();
    }

    public _onSearchBtnClicked(): void {
        alert('filtered for ' + this._selectedListBoxValue);
    }
}
