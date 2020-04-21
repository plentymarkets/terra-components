import { TestBed } from '@angular/core/testing';

import { AlertService, } from './alert.service';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { Subscription } from 'rxjs';
import { AlertType } from './alert-type.enum';
import { IS_ROOT_WINDOW } from '../../utils/window';

describe('AlertService', () =>
{
    let service:AlertService;
    beforeEach(() => TestBed.configureTestingModule({
        providers: [AlertService, {provide: IS_ROOT_WINDOW, useValue: true}]
    }));

    beforeEach(() =>
    {
        service = TestBed.get(AlertService);
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
});
