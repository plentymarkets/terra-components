import { Component } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
    selector: 'terra-alert-example',
    styleUrls: ['./terra-alert.component.example.scss'],
    templateUrl: './terra-alert.component.example.html'
})
export class TerraAlertComponentExample {
    constructor(private _alertService: AlertService) {}

    public _showInformationAlert(): void {
        this._alertService.info('info-Alert', 'info');
    }

    public _showSuccessAlert(): void {
        this._alertService.success('success-Alert', 'success');
    }

    public _showErrorAlert(): void {
        this._alertService.error('error-Alert', 'error');
    }

    public _showWarningAlert(): void {
        this._alertService.warning('warning-Alert', 'warning');
    }
}
