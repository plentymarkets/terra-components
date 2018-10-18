import { Component } from '@angular/core';
import { TerraPlacementEnum } from '../../../../..';


@Component({
    selector:    'terra-button-example',
    templateUrl: './terra-button.component.example.html',
    styleUrls:   ['./terra-button.component.example.scss']
})
export class TerraButtonComponentExample
{
    protected tooltipPlacement:TerraPlacementEnum = TerraPlacementEnum.TOP;

    private sendMailPopup():void
    {
        alert('email has been send to test@plentymarkets.com');
    }
}
