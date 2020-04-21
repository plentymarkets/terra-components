import { Subscription } from 'rxjs';

import { AlertService, } from './alert.service';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertType } from './alert-type.enum';

describe('AlertService', () =>
{
    let service:AlertService;

    beforeEach(() =>
    {
        service = new AlertService(true);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });

    describe('addAlert', () =>
    {
        let latest:TerraAlertInterface;
        let defaultTimeout:number;
        let subscription:Subscription;

        const text:string = 'warning';
        const identifier:string = 'identifier';
        beforeEach(() =>
        {
            defaultTimeout = service['defaultTimeout']; // access private property
            subscription = service.addAlert.subscribe((alert:TerraAlertInterface) => latest = alert);
            expect(latest).toBeUndefined();
        });

        it('Type: Info', () =>
        {
            service.info(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.info);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.info(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Warning', () =>
        {
            service.warning(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.warning);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.warning(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Success', () =>
        {
            service.success(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.success);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.success(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Error', () =>
        {
            service.error(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.error);
            expect(latest.dismissOnTimeout).toBe(0);
            expect(latest.identifier).toBeUndefined();

            service.error(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        afterEach(() =>
        {
            subscription.unsubscribe();
            latest = undefined;
        });
    });

    describe('closing an alert', () =>
    {
        let latest:string;
        let subscription:Subscription;

        const identifier:string = 'identifier';

        beforeEach(() =>
        {
            subscription = service.closeAlert.subscribe((ident:string) => latest = ident);
            expect(latest).toBeUndefined();
        });

        it('should emit on closeAlert', () =>
        {
            service.close(identifier);
            expect(latest).toEqual(identifier);
        });

        afterEach(() =>
        {
            subscription.unsubscribe();
            latest = undefined;
        });
    });

    it('should register listeners on the window for adding and closing alerts when created', () =>
    {
        spyOn(window, 'addEventListener');
        const newService:AlertService = new AlertService(true);
        expect(window.addEventListener).toHaveBeenCalledTimes(2);
        expect(window.addEventListener).toHaveBeenCalledWith(newService.addEvent, newService['_addAlertListener']);
        expect(window.addEventListener).toHaveBeenCalledWith(newService.closeEvent, newService['_closeAlertListener']);
    });

    it('should remove the event listeners on the window when destroyed', () =>
    {
        spyOn(window, 'removeEventListener');
        service.ngOnDestroy();
        expect(window.removeEventListener).toHaveBeenCalledTimes(2);
        expect(window.removeEventListener).toHaveBeenCalledWith(service.addEvent, service['_addAlertListener']);
        expect(window.removeEventListener).toHaveBeenCalledWith(service.closeEvent, service['_closeAlertListener']);
    });

    it('closeAlertByIndex() should close the alert at the given index', () =>
    {
        const message:string = 'success';
        service.success(message);
        expect(service.alerts.length).toBe(1);
        expect(service.alerts[0].msg).toBe(message);

        service.closeAlertByIndex(0);
        expect(service.alerts.length).toBe(0);
    });

    it('closeAlertByIdentifier() should close the first alert that matches a given identifier', () =>
    {
        const identifier:string = 'identifier';
        const message:string = 'test';
        service.info(message);
        service.success(message, identifier);
        service.error(message, identifier);
        expect(service.alerts.length).toBe(3);

        service.closeAlertByIdentifier(identifier);
        expect(service.alerts.length).toBe(2);
    });

    it('closeAlertsByIdentifier() should close all alerts matching a given identifier', () =>
    {
        const identifier:string = 'identifier';
        const message:string = 'test';
        service.info(message);
        service.success(message, identifier);
        service.error(message, identifier);
        expect(service.alerts.length).toBe(3);

        service.closeAlertsByIdentifier(identifier);
        expect(service.alerts.length).toBe(1);
        expect(service.alerts[0].identifier).toBeUndefined();
    });
});
