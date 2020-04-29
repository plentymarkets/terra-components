import { Component, OnInit } from '@angular/core';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-no-result-notice-example',
    styleUrls: ['./terra-no-result-notice.component.example.scss'],
    templateUrl: './terra-no-result-notice.component.example.html'
})
export class TerraNoResultNoticeComponentExample implements OnInit {
    public _buttons: Array<TerraButtonInterface> = [];
    public _result: boolean;

    public checkResult(value: boolean): void {
        this._result = value;
    }

    public ngOnInit(): void {
        this._buttons.push({
            caption: 'Search',
            icon: 'icon-add',
            clickFunction: (): void => {
                this._result = true;
            }
        });
    }
}
