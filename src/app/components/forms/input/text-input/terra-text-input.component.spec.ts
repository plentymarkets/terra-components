import { TerraTextInputComponent } from './terra-text-input.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { HttpClientModule } from '@angular/common/http';
import Spy = jasmine.Spy;

fdescribe('Component: TerraTextInputComponent', () =>
{
    let component:TerraTextInputComponent;
    let fixture:ComponentFixture<TerraTextInputComponent>;
    let inputElement:HTMLInputElement;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TerraTextInputComponent, TerraLabelTooltipDirective],
                imports: [
                    HttpClientModule,
                    TooltipModule.forRoot(),
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ]
            }
        ).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTextInputComponent);
        component = fixture.componentInstance;
        inputElement = fixture.nativeElement.querySelector('input');

        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialise it's inputs`, () =>
    {
        // #inputIsReadonly
        expect(component.inputIsReadonly).toBeFalsy();
        expect(inputElement.readOnly).toBeFalsy();

        // #inputIsPassword
        expect(component.inputIsPassword).toBeFalsy();
        expect(inputElement.type).toEqual('text');
    });

    it(`should set the input element's readonly property according to the state of #inputIsReadonly`,  () =>
    {
        component.inputIsReadonly = true;
        fixture.detectChanges();
        expect(inputElement.readOnly).toBeTruthy();
    });

    it(`should set the input element's type property to 'password' if #inputIsPassword is set`, () =>
    {
        component.inputIsPassword = true;
        fixture.detectChanges();
        expect(inputElement.type).toEqual('password');
    });

    it(`should set the input element's type property to 'text' if #inputIsPassword is not set`, () =>
    {
        expect(component.inputIsPassword).toBeFalsy();
        expect(inputElement.type).toEqual('text');
    });

    it(`should NOT validate the entered text if #inputIsIban is not set`, () =>
    {
        expect(component.isValid).toBeTruthy();
        expect(component.inputIsIban).toBeFalsy();

        inputElement.value = 'lkjahsdlajkds';
        inputElement.dispatchEvent(new Event('blur'));

        expect(component.isValid).toBeTruthy();
    });

    xit(`should validate the entered text whether it is a valid IBAN if #inputIsIban is set`, () =>
    {
        expect(component.isValid).toBeTruthy();

        component.inputIsIban = true;
        fixture.detectChanges();

        inputElement.value = 'lkjahsdlajkds';
        inputElement.dispatchEvent(new Event('blur'));

        expect(component.isValid).toBeFalsy();

        inputElement.value = 'DE12500105170648489890';
        inputElement.dispatchEvent(new Event('blur'));

        expect(component.isValid).toBeTruthy(); // TODO: Why does this not work??
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

        expect(called).toBeTruthy();
    });
});
