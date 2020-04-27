import { Component, OnInit } from '@angular/core';
import { TerraAlertComponent } from '../terra-alert.component';
import { AlertService } from '../alert.service';

@Component({
  selector: 'terra-alert-example',
  styleUrls: ['./terra-alert.component.example.scss'],
  templateUrl: './terra-alert.component.example.html'
})
export class TerraAlertComponentExample implements OnInit {
  private _exampleAlert: TerraAlertComponent = TerraAlertComponent.getInstance();

  constructor(private _alertService: AlertService) {}

  public ngOnInit(): void {
    this._exampleAlert.closeAlertByIdentifier('info');
  }

  public _showInformationAlert(): void {
    this._exampleAlert.addAlert({
      msg: 'info-Alert',
      type: 'info',
      dismissOnTimeout: 5000,
      identifier: 'info'
    });
  }

  public _showSuccessAlert(): void {
    this._exampleAlert.addAlert({
      msg: 'success-Alert',
      type: 'success',
      dismissOnTimeout: 5000,
      identifier: 'info'
    });
  }

  public _showErrorAlert(): void {
    this._exampleAlert.addAlert({
      msg: 'error-Alert',
      type: 'danger',
      dismissOnTimeout: 0,
      identifier: 'info'
    });
  }

  public _showWarningAlert(): void {
    this._exampleAlert.addAlert({
      msg: 'warning-Alert',
      type: 'warning',
      dismissOnTimeout: 5000,
      identifier: 'info'
    });
  }

  public _showAlertUsingService(): void {
    this._alertService.info('You have used the service');
  }
}
