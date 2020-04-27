import { Component, OnDestroy, OnInit } from '@angular/core';
import { TerraAlertComponent } from './terra-alert.component';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

/**
 * @author mkunze
 */
@Component({
  selector: 'terra-alert-panel',
  templateUrl: './terra-alert-panel.component.html',
  styleUrls: ['./terra-alert-panel.component.scss']
})
export class TerraAlertPanelComponent implements OnInit, OnDestroy {
  public _alerts: Array<TerraAlertInterface>;
  private _alert: TerraAlertComponent = TerraAlertComponent.getInstance();

  private _addAlertSub: Subscription;
  private _closeAlertSub: Subscription;

  private readonly _addAlertListener: EventListener;
  private readonly _closeAlertListener: EventListener;

  constructor(private _service: AlertService) {
    this._alerts = this._alert.alerts;

    // init event listeners
    this._addAlertListener = (event: CustomEvent<TerraAlertInterface>): void =>
      this._addAlert(event.detail);
    this._closeAlertListener = (event: CustomEvent<string>): void => this._closeAlert(event.detail);
  }

  public ngOnInit(): void {
    // listen to the EventEmitters of the service
    this._addAlertSub = this._service.addAlert.subscribe((alert: TerraAlertInterface) =>
      this._addAlert(alert)
    );
    this._closeAlertSub = this._service.closeAlert.subscribe((identifier: string) =>
      this._closeAlert(identifier)
    );

    // listen to events that concern _alerts and are dispatched to the hosting window
    window.addEventListener(this._service.addEvent, this._addAlertListener);
    window.addEventListener(this._service.closeEvent, this._closeAlertListener);
  }

  public ngOnDestroy(): void {
    // unsubscribe to the EventEmitters of the service
    this._addAlertSub.unsubscribe();
    this._closeAlertSub.unsubscribe();

    // remove listeners from the hosting window
    window.removeEventListener(this._service.addEvent, this._addAlertListener);
    window.removeEventListener(this._service.closeEvent, this._closeAlertListener);
  }

  public _closeAlertByIndex(index: number): void {
    this._alert.closeAlertByIndex(index);
  }

  private _addAlert(alert: TerraAlertInterface): void {
    this._alert.addAlert(alert);
  }

  private _closeAlert(identifier: string): void {
    this._alert.closeAlertByIdentifier(identifier);
  }
}
