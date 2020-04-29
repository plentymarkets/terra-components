import { Component } from '@angular/core';
import { TerraTagInterface } from '../../tag/data/terra-tag.interface';
import { TerraButtonInterface } from '../../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-info-box-example',
    styleUrls: ['./terra-info-box.component.example.scss'],
    templateUrl: './terra-info-box.component.example.html'
})
export class TerraInfoBoxComponentExample {
    public _tagList: Array<TerraTagInterface> = [];
    public _buttonList: Array<TerraButtonInterface> = [];

    constructor() {
        this._tagList.push(
            {
                name: 'Terra',
                color: 'green'
            },
            {
                name: 'Plenty',
                color: 'red'
            }
        );
        this._buttonList.push(
            {
                caption: 'Terra',
                icon: 'icon-plugin_not_productive',
                clickFunction: (): void => this.clickFunction('Terra')
            },
            {
                caption: 'Terra',
                icon: 'icon-plugin_not_productive',
                clickFunction: (): void => this.clickFunction('Terra')
            }
        );
    }

    public clickFunction(clickedButton: string): void {
        alert(clickedButton + ' clicked');
    }
}
