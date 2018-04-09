import { Component } from '@angular/core';


@Component({
    selector: 'terra-button-example',
    styles:   [require('./terra-button.component.example.scss')],
    template: require('./terra-button.component.example.html')
})
export class TerraButtonComponentExample
{
    private sendMailPopup():void
    {
        alert('email has been send to test@plentymarkets.com');
    }
}
