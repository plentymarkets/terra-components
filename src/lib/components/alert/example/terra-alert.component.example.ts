import {
    Component,
    OnInit
} from '@angular/core';

import { TerraAlertComponent } from '../terra-alert.component';
import { AlertService } from '../alert.service';

@Component({
    selector: 'terra-alert-example',
    styles:   [require('./terra-alert.component.example.scss')],
    template: require('./terra-alert.component.example.html')
})
export class TerraAlertComponentExample implements OnInit
{
    private exampleAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(private alertService:AlertService)
    {
    }

    public ngOnInit():void
    {
        this.exampleAlert.closeAlertByIdentifier('info');
    }

    protected showInformationAlert():void
    {
        this.exampleAlert.addAlert({
            msg:              'info-Alert',
            type:             'info',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
    }

    protected showSuccessAlert():void
    {
        this.exampleAlert.addAlert({
            msg:              'success-Alert',
            type:             'success',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
    }

    protected showErrorAlert():void
    {
        this.exampleAlert.addAlert({
            msg:              'error-Alert',
            type:             'danger',
            dismissOnTimeout: 0,
            identifier:       'info'
        });
    }

    protected showWarningAlert():void
    {
        this.exampleAlert.addAlert({
            msg:              'warning-Alert',
            type:             'warning',
            dismissOnTimeout: 5000,
            identifier:       'info'
        });
    }

    protected showAlertUsingService():void
    {
        this.alertService.info('You have used the service');
    }
}
