import { Component, OnInit } from '@angular/core';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-portlet-example',
    templateUrl: './terra-portlet.component.example.html'
})
export class TerraPortletComponentExample implements OnInit {
    public portletButtonList: Array<TerraButtonInterface> = [];

    public ngOnInit(): void {
        this.portletButtonList.push(
            {
                icon: 'icon-delete',
                clickFunction: (): void => TerraPortletComponentExample.buttonClickFunction()
            },
            {
                icon: 'icon-edit',
                clickFunction: (): void => TerraPortletComponentExample.buttonClickFunction()
            }
        );
    }

    private static buttonClickFunction(): void {
        alert('button clicked');
    }
}
