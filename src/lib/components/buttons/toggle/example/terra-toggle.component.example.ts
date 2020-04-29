import { Component } from '@angular/core';

@Component({
    selector: 'terra-toggle-example',
    styleUrls: ['./terra-toggle.component.example.scss'],
    templateUrl: './terra-toggle.component.example.html'
})
export class TerraToggleComponentExample {
    public _isToggled: boolean = false;

    public _showMessage(msg: string): void {
        alert(msg);
    }
}
