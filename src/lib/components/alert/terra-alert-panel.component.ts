import { Component } from '@angular/core';
import { AlertService } from './alert.service';

/**
 * @author mkunze
 * @description Displays a list of alerts provided by the AlertService.
 */
@Component({
    selector: 'terra-alert-panel',
    templateUrl: './terra-alert-panel.component.html',
    styleUrls:   ['./terra-alert-panel.component.scss'],
})
export class TerraAlertPanelComponent
{
    constructor(public _service:AlertService)
    {}

    public _closeAlertByIndex(index:number):void
    {
        this._service.closeAlertByIndex(index);
    }
}
