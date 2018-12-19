import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

@Component({
    selector: 'tc-filter-example',
    template: require('./filter.component.example.html'),
})
export class FilterComponentExample implements OnInit
{
    protected name:string = '';

    protected listBoxValues:Array<TerraSelectBoxValueInterface> = [];
    protected selectedListBoxValue:number = 1;

    public ngOnInit():void
    {
        for(let i:number = 1; i < 4; i++)
        {
            this.listBoxValues.push(
                {
                    value:   'test' + i,
                    caption: 'Test' + i
                }
            );
        }
    }

    protected onSearchBtnClicked():void
    {
        alert('filtered for ' + this.selectedListBoxValue);
    }

    protected onResetBtnClicked():void
    {
        this.name = '';
        this.selectedListBoxValue = 1;
    }
}
