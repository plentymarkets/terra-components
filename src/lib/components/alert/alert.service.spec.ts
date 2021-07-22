import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';
import { TerraAlertInterface } from './data/terra-alert.interface';
import { AlertType } from './alert-type.enum';

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        service = new AlertService(true);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('addAlert', () => {
        let latest: TerraAlertInterface;
        let defaultTimeout: number;
        let subscription: Subscription;

        const text: string = 'warning';
        let identifier: string = 'identifier';
        beforeEach(() => {
            defaultTimeout = service['defaultTimeout']; // access private property
            subscription = service.addAlert.subscribe((alert: TerraAlertInterface) => (latest = alert));
            expect(latest).toBeUndefined();
        });

        it('Type: Info', () => {
            service.info(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.info);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.info(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Warning', () => {
            service.warning(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.warning);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.warning(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Success', () => {
            service.success(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.success);
            expect(latest.dismissOnTimeout).toBe(defaultTimeout);
            expect(latest.identifier).toBeUndefined();

            service.success(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        it('Type: Error', () => {
            service.error(text);
            expect(latest).toBeDefined();
            expect(latest.msg).toBe(text);
            expect(latest.type).toBe(AlertType.error);
            expect(latest.dismissOnTimeout).toBe(0);
            expect(latest.identifier).toBeUndefined();

            service.error(text, identifier);
            expect(latest.identifier).toEqual(identifier);
        });

        afterEach(() => {
            subscription.unsubscribe();
            latest = undefined;
        });
    });

    describe('closing an alert', () => {
        let latest: string;
        let subscription: Subscription;

        const identifier: string = 'identifier';

        beforeEach(() => {
            subscription = service.closeAlert.subscribe((ident: string) => (latest = ident));
            expect(latest).toBeUndefined();
        });

        it('should emit on closeAlert', () => {
            service.close(identifier);
            expect(latest).toEqual(identifier);
        });

        afterEach(() => {
            subscription.unsubscribe();
            latest = undefined;
        });
    });

    describe('used not in the root window', () => {
        beforeEach(() => (service = new AlertService(false)));

        it('should dispatch an event to the parent window to add an alert', () => {
            spyOn(window.parent.window, 'dispatchEvent');
            const msg: string = 'my message';
            service.info(msg);
            expect(window.parent.window.dispatchEvent).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: service.addEvent,
                    detail: jasmine.objectContaining({
                        msg: msg,
                        type: AlertType.info
                    })
                })
            );
        });

        it('should dispatch an event to the parent window to close an alert', () => {
            spyOn(window.parent.window, 'dispatchEvent');
            const identifier: string = 'myId';
            service.close(identifier);
            expect(window.parent.window.dispatchEvent).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    type: service.closeEvent,
                    detail: identifier
                })
            );
        });
    });
});
