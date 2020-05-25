import { TerraTextInputComponent } from './terra-text-input.component';
import {
    ComponentFixture,
    fakeAsync,
    flush,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../../app/translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import Spy = jasmine.Spy;

describe('Component: TerraTextInputComponent', () =>
{
    let component:TerraTextInputComponent;
    let fixture:ComponentFixture<TerraTextInputComponent>;
    let inputElement:HTMLInputElement;
    let inputDebugElement:DebugElement;
    const testString:string = 'test';
    const router:MockRouter = new MockRouter();

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TerraTextInputComponent,
                               TooltipDirective,
                               TerraLabelTooltipDirective],
                imports:      [
                    HttpClientModule,
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ],
                providers:    [
                    {
                        provide:  Router,
                        useValue: router
                    }]
            }
        );
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTextInputComponent);
        component = fixture.componentInstance;
        inputDebugElement = fixture.debugElement.query(By.css('input'));
        inputElement = inputDebugElement.nativeElement;

        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialise it's inputs and outputs`, () =>
    {
        // #inputIsReadonly
        expect(component.inputIsReadonly).toBe(false);
        expect(inputElement.readOnly).toBeFalsy();

        // #inputIsPassword
        expect(component.inputIsPassword).toBe(false);
        expect(inputElement.type).toEqual('text');

        // #inputIsIban
        expect(component.inputIsIban).toBe(false);

        // #outputOnInput
        expect(component.outputOnInput).toBeDefined();
    });

    it(`should set the input element's readonly property according to the state of #inputIsReadonly`, () =>
    {
        component.inputIsReadonly = true;
        fixture.detectChanges();
        expect(inputElement.readOnly).toBe(true);
    });

    it(`should set the input element's type property to 'password' if #inputIsPassword is set`, () =>
    {
        component.inputIsPassword = true;
        fixture.detectChanges();
        expect(inputElement.type).toEqual('password');
    });

    it(`should NOT validate the entered text if #inputIsIban is not set`, () =>
    {
        expect(component.isValid).toBe(true);
        expect(component.inputIsIban).toBe(false);

        inputElement.value = 'lkjahsdlajkds';
        inputElement.dispatchEvent(new Event('blur'));

        expect(component.isValid).toBe(true);
    });

    it(`should validate the entered text whether it is a valid IBAN if #inputIsIban is set`, () =>
    {
        expect(component.isValid).toBeTruthy();

        component.inputIsIban = true;

        component.value = 'kjashdlkasd';
        inputElement.dispatchEvent(new Event('blur'));
        expect(component.isValid).toBe(false);

        component.value = 'DE12500105170648489890'; // from https://www.iban-bic.com/sample_accounts.html
        inputElement.dispatchEvent(new Event('blur'));
        expect(component.isValid).toBe(true);

        component.value = 'DE12500105170648489892'; // changed one digit of the previous one which should make it invalid
        inputElement.dispatchEvent(new Event('blur'));
        expect(component.isValid).toBe(false);
    });

    it(`should call #onInput method if something is typed in`, () =>
    {
        let onInputSpy:Spy = spyOn(component, 'onInput');
        inputElement.dispatchEvent(new Event('input'));

        expect(onInputSpy).toHaveBeenCalled();
    });

    it(`should emit a value on #ouputOnInput if #onInput is called`, () =>
    {
        let called:boolean = false;
        component.outputOnInput.subscribe(() => called = true);
        component.onInput();

        expect(called).toBe(true);
    });

    it(`should emit the value on #outputOnInput that has just been entered`, () =>
    {
        let value:string = '';
        component.outputOnInput.subscribe((enteredValue:string) => value = enteredValue);
        inputElement.value = testString;
        inputElement.dispatchEvent(new Event('input'));
        expect(value).toEqual(testString);
    });

    it(`should focus the input element if #focusNativeInput method is called`, fakeAsync(() =>
    {
        expect(document.activeElement).not.toEqual(inputElement);
        component.focusNativeInput();
        flush();
        expect(document.activeElement).toEqual(inputElement);
    }));

    it(`should select the text of the input if #selectNativeInput method is called`, fakeAsync(() =>
    {
        let spy:Spy = spyOn(inputElement, 'select').and.callThrough();
        inputElement.value = testString;
        expect(inputElement.selectionStart).toEqual(inputElement.selectionEnd); // nothing selected
        component.selectNativeInput();
        flush();
        expect(inputElement.selectionStart).toEqual(0);
        expect(inputElement.selectionEnd).toEqual(testString.length);
        expect(spy).toHaveBeenCalled();
    }));
});
