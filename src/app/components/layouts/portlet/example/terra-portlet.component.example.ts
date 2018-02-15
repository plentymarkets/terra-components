import {
    Component,
    OnInit
} from '@angular/core';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-portlet-example',
    template: require('./terra-portlet.component.example.html')
})
export class TerraPortletComponentExample implements OnInit
{
    private _portletButtonList: Array<TerraButtonInterface> = [];

    private buttonClickFunction()
    {
        alert('button clicked');
    }

    ngOnInit()
    {
        this._portletButtonList.push(
            {
                icon: 'icon-delete',
                isSecondary: true,
                clickFunction: ():void=> this.buttonClickFunction()
            },
            {
                icon: 'icon-edit',
                clickFunction: ():void=> this.buttonClickFunction()
            })
    }
}