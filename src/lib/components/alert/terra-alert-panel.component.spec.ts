import { AlertService } from './alert.service';
import { TerraAlertPanelComponent } from './terra-alert-panel.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertType } from './alert-type.enum';

describe('TerraAlertPanelComponent: ', () => {
    let component: TerraAlertPanelComponent;
    let service: AlertService;
    beforeEach(() => {
        service = new AlertService(true);
        component = new TerraAlertPanelComponent(service);
        component.ngOnInit();
    });

    it('should add an alert when requested via the AlertService', () => {
        const msg: string = 'my message';
        service.info(msg);
        expect(component._alerts.length).toBe(1);

        const alert: TerraAlertInterface = component._alerts[0];
        expect(alert.msg).toBe(msg);
        expect(alert.type).toBe(AlertType.info);
    });

    it('should close an alert when requested via the AlertService', () => {
        const msg: string = 'my message';
        const identifier: string = 'myIdentifier';
        service.info(msg, identifier);
        expect(component._alerts.length).toBe(1);

        service.close(identifier);
        expect(component._alerts.length).toBe(0);
    });

    it('should add an alert when requested via a window event', () => {
        const event: CustomEvent<TerraAlertInterface> = new CustomEvent<TerraAlertInterface>(service.addEvent, {
            detail: { msg: 'my message', type: AlertType.info, dismissOnTimeout: 0 }
        });
        window.dispatchEvent(event);

        expect(component._alerts.length).toBe(1);
    });

    it('should close an alert when requested via a window event', () => {
        const identifier: string = 'myInfo';
        service.info('my message', identifier);
        expect(component._alerts.length).toBe(1);

        const event: CustomEvent<string> = new CustomEvent<string>(service.closeEvent, {
            detail: identifier
        });
        window.dispatchEvent(event);

        expect(component._alerts.length).toBe(0);
    });

    it('_closeAlertByIndex() should close the alert at the given index', () => {
        const message: string = 'success';
        service.success(message);
        expect(component._alerts.length).toBe(1);
        expect(component._alerts[0].msg).toBe(message);

        component._closeAlertByIndex(0);
        expect(component._alerts.length).toBe(0);
    });

    it('close() should close the first alert that matches a given identifier', () => {
        const identifier: string = 'identifier';
        const message: string = 'test';
        service.info(message);
        service.success(message, identifier);
        service.error(message, identifier);
        expect(component._alerts.length).toBe(3);

        service.close(identifier);
        expect(component._alerts.length).toBe(2);
    });

    it('should dismiss an alert automatically after the given #dismissOnTimeout amount of time', fakeAsync(() => {
        spyOn(component, '_closeAlertByIndex');
        service.info('my message');
        service.error('an error');
        expect(component._alerts.length).toBe(2);

        tick(service['defaultTimeout']);

        expect(component._closeAlertByIndex).toHaveBeenCalledWith(1);
    }));

    it('should unsubscribe EventEmitter of service when component is destroyed', () => {
        expect(service.addAlert.observers.length).not.toBe(0);
        expect(service.closeAlert.observers.length).not.toBe(0);
        component.ngOnDestroy();
        expect(service.addAlert.observers.length).toBe(0);
        expect(service.closeAlert.observers.length).toBe(0);
    });

    it('should unsubscribe EventEmitter of service when component with alert requested via a window event is destroyed', () => {
        const removeEventListenerSpy: jasmine.Spy = spyOn(window, 'removeEventListener');
        component.ngOnDestroy();
        expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
        expect(removeEventListenerSpy.calls.argsFor(0)[0]).toBe(service.addEvent);
        expect(removeEventListenerSpy.calls.argsFor(1)[0]).toBe(service.closeEvent);
    });
});
