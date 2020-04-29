import { Component } from '@angular/core';
import { TerraPlacementEnum } from '../../../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-button-example',
    styleUrls: ['./terra-button.component.example.scss'],
    templateUrl: './terra-button.component.example.html'
})
export class TerraButtonComponentExample {
    public _tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    public _sendMailPopup(): void {
        alert('email has been send to test@plentymarkets.com');
    }
}
