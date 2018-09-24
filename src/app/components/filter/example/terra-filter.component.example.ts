import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

@Component({
    selector: 'terra-filter-example',
    styles:   [require('./terra-filter.component.example.scss')],
    template: require('./terra-filter.component.example.html'),
})
export class TerraFilterComponentExample implements OnInit
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

    private onSearchBtnClicked():void
    {
        alert('filtered for ' + this.selectedListBoxValue);
    }

    protected onResetBtnClicked():void
    {
        return;
    }

    protected onSubmit():void
    {
        this.onSearchBtnClicked();
    }
}
