import { TestBed } from '@angular/core/testing';

import {
    AlertService,
    AlertType
} from './alert.service';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { Subscription } from 'rxjs';

fdescribe('AlertService', () =>
{
    let service:AlertService;
    beforeEach(() => TestBed.configureTestingModule({
        providers: [AlertService]
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
            service.handleInfo(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.info);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.handleInfo(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Warning', () =>
        {
            service.handleWarning(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.warning);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.handleWarning(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Success', () =>
        {
            service.handleMessage(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.success);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.handleMessage(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Error', () =>
        {
            service.handleError(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.error);
            expect(latest.dismissOnTimeout).toBe(0);
            expect(latest.identifier).toBeUndefined();

            service.handleError(text, identifier);
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
});
