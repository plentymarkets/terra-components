import { Component } from '@angular/core';

@Component({
    selector: 'terra-text-input-example',
    styles:   [require('./terra-text-input.component.example.scss')],
    template: require('./terra-text-input.component.example.html'),
})
export class TerraTextInputComponentExample
{
    private _username:string;

    public showUsername():void
    {
        alert('Username: ' + this._username);
    }
}
