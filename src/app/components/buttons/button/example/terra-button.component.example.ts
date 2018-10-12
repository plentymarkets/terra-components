import { Component } from '@angular/core';


@Component({
    selector:    'terra-button-example',
    templateUrl: './terra-button.component.example.html',
    styleUrls:   ['./terra-button.component.example.scss']
})
export class TerraButtonComponentExample
{
    private sendMailPopup():void
    {
        alert('email has been send to test@plentymarkets.com');
    }
}
