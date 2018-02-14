import {
    Component,
    OnInit
} from "@angular/core";
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

@Component({
    selector: 'terra-filter-example',
    styles:   [require('./terra-filter.component.example.scss')],
    template: require('./terra-filter.component.example.html'),
})
export class TerraFilterComponentExample implements OnInit
{
    private _name:string = '';

    private _listBoxValues:Array<TerraSelectBoxValueInterface> = [];
    private _selectedListBoxValue:number = 1;

    constructor()
    {
    }

    ngOnInit()
    {
        for(let i = 1; i < 4; i++)
        {
            this._listBoxValues.push(
                {
                    value:   'test' + i,
                    caption: 'Test' + i
                }
            );
        }
    }

    private onSearchBtnClicked():void
    {
        alert('filtered for ' + this._selectedListBoxValue);
    }

    private onResetBtnClicked():void
    {
    }

    private onSubmit():void
    {
        this.onSearchBtnClicked();
    }

}