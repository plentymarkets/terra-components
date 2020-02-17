import { Component } from '@angular/core';

@Component({
    selector:    'terra-button-example',
    styleUrls:   ['./terra-button.component.example.scss'],
    templateUrl: './terra-button.component.example.html'
})
export class TerraButtonComponentExample
{
    public _sendMailPopup():void
    {
        alert('email has been send to test@plentymarkets.com');
    }
}
