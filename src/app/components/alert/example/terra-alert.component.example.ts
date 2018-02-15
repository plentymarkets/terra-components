import {
    Component,
    OnInit
} from '@angular/core';

import { TerraAlertComponent } from '../terra-alert.component';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-alert-example',
    styles:   [require('./terra-alert.component.example.scss')],
    template: require('./terra-alert.component.example.html')
})
export class TerraAlertComponentExample implements OnInit
{
    private _exampleAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(public translation:TranslationService)
    {
    }

    ngOnInit()
    {
        this._exampleAlert.closeAlertByIdentifier('info');
    }

    private showInformationAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'info-Alert',
            type:             'info',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
        this.emptyAlertArray();
    }

    private showSuccessAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'success-Alert',
            type:             'success',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
        this.emptyAlertArray();
    }

    private showErrorAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'error-Alert',
            type:             'danger',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
        this.emptyAlertArray();
    }

    private showWarningAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'warning-Alert',
            type:             'warning',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
        this.emptyAlertArray();
    }

    public emptyAlertArray()
    { //No part of the Example (Ignore that Function)
        setTimeout(() => this._exampleAlert.closeAlertByIdentifier('info'), 5000);
    }
}
