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

    /**
     * @description Closes an alert identified by its index in the list of alerts.
     * @param index
     * @internal
     */
    public _closeAlertByIndex(index:number):void
    {
        this._service._closeAlertByIndex(index);
    }
}
