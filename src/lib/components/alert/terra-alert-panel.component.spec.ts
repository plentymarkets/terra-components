import { AlertService } from './alert.service';
import { TerraAlertPanelComponent } from './terra-alert-panel.component';

describe('TerraAlertPanelComponent: ', () => {
    let component: TerraAlertPanelComponent;
    let service: AlertService;
    beforeEach(() => {
        service = new AlertService(true);
        component = new TerraAlertPanelComponent(service);
    });

    it('should register listeners on the window for adding and closing alerts when initialized', () => {
        spyOn(window, 'addEventListener');
        component.ngOnInit();
        expect(window.addEventListener).toHaveBeenCalledTimes(2);
        expect(window.addEventListener).toHaveBeenCalledWith(service.addEvent, component['_addAlertListener']);
        expect(window.addEventListener).toHaveBeenCalledWith(service.closeEvent, component['_closeAlertListener']);
    });

    it('should remove the event listeners on the window when destroyed', () => {
        component.ngOnInit();
        spyOn(window, 'removeEventListener');
        component.ngOnDestroy();
        expect(window.removeEventListener).toHaveBeenCalledTimes(2);
        expect(window.removeEventListener).toHaveBeenCalledWith(service.addEvent, component['_addAlertListener']);
        expect(window.removeEventListener).toHaveBeenCalledWith(service.closeEvent, component['_closeAlertListener']);
    });

    it('_closeAlertByIndex() should close the alert at the given index', () => {
        component.ngOnInit();
        const message: string = 'success';
        service.success(message);
        expect(component._alerts.length).toBe(1);
        expect(component._alerts[0].msg).toBe(message);

        component._closeAlertByIndex(0);
        expect(component._alerts.length).toBe(0);
    });

    xit('close() should close the first alert that matches a given identifier', () => {
        // const identifier:string = 'identifier';
        // const message:string = 'test';
        // service.info(message);
        // service.success(message, identifier);
        // service.error(message, identifier);
        // expect(service._alerts.length).toBe(3);
        //
        // service.closeAlertBy(identifier);
        // expect(service._alerts.length).toBe(2);
    });
});
