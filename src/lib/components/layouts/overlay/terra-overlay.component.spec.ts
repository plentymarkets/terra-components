import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TerraOverlayComponent } from './terra-overlay.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { mockButtonOne, mockButtonTwo } from '../../../testing/mock-buttons';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../testing/mock-router';
import Spy = jasmine.Spy;
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

describe('TerraOverlayComponent', () => {
    let component: TerraOverlayComponent;
    let fixture: ComponentFixture<TerraOverlayComponent>;
    let divElement: DebugElement;
    let modalDialogElement: DebugElement;
    const overlayTitle: string = 'Test';
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule.forRoot()],
            declarations: [TooltipDirective, TerraButtonComponent, TerraOverlayComponent],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraOverlayComponent);
        component = fixture.componentInstance;

        divElement = fixture.debugElement.query(By.css('div.modal.fade'));
        modalDialogElement = fixture.debugElement.query(By.css('div.modal-dialog'));
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should be initialized correctly', () => {
        expect(component.inputIsSmall).toBe(false);
        expect(component.inputIsLarge).toBe(true);
        expect(component.inputIsExtraLarge).toBe(false);
        expect(component.inputIsCloseable).toBe(true);
        expect(component.inputIsStatic).toBe(false);

        expect(component.inputOverlayTitle).toBeFalsy(); // default is not set

        fixture.detectChanges();

        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));

        expect(header).toBeTruthy(); // header should be present as default

        expect(component.inputPrimaryButtonInterface).toBeFalsy();
        expect(component.inputSecondaryButtonInterface).toBeFalsy();

        let footer: DebugElement = fixture.debugElement.query(By.css('div.modal-footer'));

        expect(footer).toBeFalsy(); // footer should NOT be present as default
    });

    it(`should call 'emitOutputOnHide' after it has been hidden`, () => {
        let onOutputSpy: Spy = spyOn(component, 'emitOutputOnHide');
        divElement.triggerEventHandler('onHidden', null);

        expect(onOutputSpy).toHaveBeenCalled();
    });

    it(`should call 'emitOutputOnShow' after it has been opened`, () => {
        let onOutputSpy: Spy = spyOn(component, 'emitOutputOnShow');
        divElement.triggerEventHandler('onShown', null);

        expect(onOutputSpy).toHaveBeenCalled();
    });

    it(`should set modal sizes (classes) according to the inputs`, () => {
        fixture.detectChanges(); // needed to set css classes correctly
        expect(modalDialogElement.classes['modal-lg']).toBe(true); // default

        component.inputIsExtraLarge = true;
        component.inputIsLarge = false;
        component.inputIsSmall = true;

        fixture.detectChanges();

        expect(modalDialogElement.classes['modal-lg']).toBe(false);
        expect(modalDialogElement.classes['modal-xl']).toBe(true);
        expect(modalDialogElement.classes['modal-sm']).toBe(true);
    });

    it(`should set 'inputIsStatic' depending on 'inputIsClosable'`, () => {
        component.inputIsCloseable = false;
        fixture.detectChanges();
        component.ngAfterViewInit();

        expect(component.inputIsStatic).toBe(true);
        expect(component._viewChildOverlay.config.backdrop).toBe('static');
        expect(component._viewChildOverlay.config.keyboard).toBe(false);
    });

    it(`should show header depending on 'inputOverlayTitle'`, () => {
        component.inputOverlayTitle = overlayTitle;
        component.inputIsCloseable = false;

        fixture.detectChanges();
        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));

        expect(header).toBeTruthy(); // should be present because inputOverlayTitle is set
    });

    it(`should show header depending on 'inputOverlayTitle' and 'inputIsClosable'`, () => {
        component.inputOverlayTitle = overlayTitle;
        component.inputIsCloseable = true;

        fixture.detectChanges();

        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));

        expect(header).toBeTruthy(); // should be present because inputOverlayTitle and inputIsCloseable are set
    });

    it(`should NOT show header depending on 'inputOverlayTitle' or 'inputIsClosable'`, () => {
        component.inputOverlayTitle = null;
        component.inputIsCloseable = false;

        fixture.detectChanges();

        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));

        expect(header).toBeFalsy(); // should NOT be present because inputOverlayTitle and inputIsCloseable are NOT set
    });

    it(`should show close button depending on 'inputIsClosable'`, () => {
        component.inputIsCloseable = true;
        component.inputOverlayTitle = overlayTitle;
        fixture.detectChanges();

        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));

        expect(header.query(By.css('terra-button'))).toBeTruthy(); // button is present
    });

    it(`should NOT show close button depending on 'inputIsClosable'`, () => {
        component.inputIsCloseable = false;
        component.inputOverlayTitle = overlayTitle;
        fixture.detectChanges();

        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));

        expect(header.query(By.css('terra-button'))).toBeFalsy(); // button is NOT present
    });

    it(`should NOT show title depending on 'inputOverlayTitle'`, () => {
        component.inputOverlayTitle = null;
        fixture.detectChanges();

        let title: DebugElement = fixture.debugElement.query(By.css('h4.modal-title'));
        let titleElement: HTMLHeadingElement = title.nativeElement;

        expect(titleElement.innerHTML).toBeFalsy(); // title text is NOT present

        component.inputOverlayTitle = overlayTitle;
        fixture.detectChanges();

        expect(titleElement.innerHTML).toBe(overlayTitle); // title text is present
    });

    it(`should call #hideOverlay on close button click`, () => {
        component.inputIsCloseable = true;
        fixture.detectChanges();

        let header: DebugElement = fixture.debugElement.query(By.css('div.modal-header'));
        let button: DebugElement = header.children[1];

        let hideOverlaySpy: Spy = spyOn(component, 'hideOverlay');

        button.triggerEventHandler('outputClicked', null);

        expect(hideOverlaySpy).toHaveBeenCalled();
    });

    it(`should show the footer if 'inputPrimaryButtonInterface' is set`, () => {
        component.inputPrimaryButtonInterface = mockButtonOne;

        fixture.detectChanges();

        let footer: DebugElement = fixture.debugElement.query(By.css('div.modal-footer'));

        expect(footer).toBeTruthy(); // footer should be present as default
    });

    it(`should show the footer if 'inputSecondaryButtonInterface' is set`, () => {
        component.inputPrimaryButtonInterface = null;
        component.inputSecondaryButtonInterface = mockButtonTwo;

        fixture.detectChanges();

        let footer: DebugElement = fixture.debugElement.query(By.css('div.modal-footer'));

        expect(footer).toBeTruthy(); // footer should be present as default
    });

    it(`should NOT show the footer if 'inputSecondaryButtonInterface' and 'inputPrimaryButtonInterface' are not set`, () => {
        component.inputPrimaryButtonInterface = null;
        component.inputSecondaryButtonInterface = null;

        fixture.detectChanges();

        let footer: DebugElement = fixture.debugElement.query(By.css('div.modal-footer'));

        expect(footer).toBeFalsy(); // footer should be present as default
    });

    it(`should trigger the show method of viewChild when #showOverlay is called`, () => {
        let spy: Spy = spyOn(component._viewChildOverlay, 'show');

        component.showOverlay();

        expect(spy).toHaveBeenCalled();
    });

    it(`should trigger the hide method of viewChild when #hideOverlay is called`, () => {
        let spy: Spy = spyOn(component._viewChildOverlay, 'hide');

        component.hideOverlay();

        expect(spy).toHaveBeenCalled();
    });

    it(`should return the directive when #emitOutputOnHide is called`, (done: DoneFn) => {
        component.outputOnHide.subscribe((directive: ModalDirective) => {
            expect(directive).toBe(component._viewChildOverlay);
            done();
        });

        component.emitOutputOnHide();
    });

    it(`should return the directive when #emitOutputOnShow is called`, (done: DoneFn) => {
        component.outputOnShow.subscribe((directive: ModalDirective) => {
            expect(directive).toBe(component._viewChildOverlay);
            done();
        });

        component.emitOutputOnShow();
    });
});
