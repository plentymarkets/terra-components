import { Component } from '@angular/core';
import { TerraPlacementEnum } from '../../../../..';


@Component({
    selector: 'terra-button-example',
    styles:   [require('./terra-button.component.example.scss')],
    template: require('./terra-button.component.example.html')
})
export class TerraButtonComponentExample
{
    protected tooltipPlacement:TerraPlacementEnum = TerraPlacementEnum.TOP;

    private sendMailPopup():void
    {
        alert('email has been send to test@plentymarkets.com');
    }
}
