import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertService } from './alert.service';

/**
 * @author mkunze
 */
@Component({
    selector: 'terra-alert-panel',
    templateUrl: './terra-alert-panel.component.html'
})
export class TerraAlertPanelComponent implements OnInit, OnDestroy {
    /** List of alerts that are currently shown in the panel. */
    public _alerts: Array<TerraAlertInterface> = [];
    /** A stream that emits when this component is destroyed. */
    private _destroyed: Subject<void> = new Subject();

    constructor(private _service: AlertService) {}

    public ngOnInit(): void {
        this._createEventObservable(
            this._service.addAlert,
            this._service.addEvent
        ).subscribe((alert: TerraAlertInterface) => this._add(alert));
        this._createEventObservable(
            this._service.closeAlert,
            this._service.closeEvent
        ).subscribe((identifier: string) => this._closeAlertByIdentifier(identifier));
    }

    public ngOnDestroy(): void {
        // unsubscribe to the EventEmitters of the service and the window events
        this._destroyed.next();
        this._destroyed.complete();
    }

    /**
     * Closes the alert at the given index.
     * @private
     */
    public _closeAlertByIndex(index: number): void {
        this._alerts.splice(index, 1);
    }

    /** Closes the first alert that matches the given identifier. */
    private _closeAlertByIdentifier(identifier: string): void {
        const index: number = this._alerts.findIndex((alert: TerraAlertInterface) => alert.identifier === identifier);
        this._closeAlertByIndex(index);
    }

    /** Closes a given alert reference. */
    private _closeAlert(alert: TerraAlertInterface): void {
        const index: number = this._alerts.indexOf(alert);
        this._closeAlertByIndex(index);
    }

    /** Adds an alert and sets up a timeout to dismiss the alert automatically if needed. */
    private _add(alert: TerraAlertInterface): void {
        // add the alert
        this._alerts.unshift(alert);

        // alert should be dismissed automatically?
        if (alert.dismissOnTimeout > 0) {
            // close the alert automatically after the given period of time
            setTimeout(() => this._closeAlert(alert), alert.dismissOnTimeout);
        }
    }

    /**
     * Creates an Observable that emits whenever the given observable emits or a custom window event with the given #eventName occurs.
     * @param obs
     * @param eventName
     */
    private _createEventObservable<T>(obs: Observable<T>, eventName: string): Observable<T> {
        return merge(obs, fromEvent(window, eventName).pipe(map((event: CustomEvent<T>) => event.detail))).pipe(
            takeUntil(this._destroyed)
        );
    }
}
