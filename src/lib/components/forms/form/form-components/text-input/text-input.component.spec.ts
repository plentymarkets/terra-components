import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';
import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';
import { L10N_LOCALE, L10nTranslationModule, L10nTranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../../../../testing/mock-translation-service';
import { IbanValidatorDirective } from '../../../../../validators/iban-validator';

// tslint:disable-next-line:max-function-line-count
describe('TextInputComponent', () => {
    let fixture: ComponentFixture<TextInputComponent>;
    let component: TextInputComponent;
    let loader: HarnessLoader;
    let input: MatInputHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule, FormsModule, L10nTranslationModule],
            declarations: [TextInputComponent, MockTooltipDirective, IbanValidatorDirective],
            providers: [
                {
                    provide: L10nTranslationService,
                    useClass: MockTranslationService
                },
                {
                    provide: L10N_LOCALE,
                    useValue: { language: 'de' }
                }
            ]
        });

        fixture = TestBed.createComponent(TextInputComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        input = await loader.getHarness(MatInputHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
    });

    it('should have type text', async () => {
        expect(await input.getType()).toBe('text');
    });

    it('should have type password if isPassword === true', async () => {
        component.isPassword = true;
        fixture.detectChanges();

        expect(await input.getType()).toBe('password');
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await input.isRequired()).toBe(true);
    });

    it('should disable the input when #isDisabled is set', async () => {
        expect(await input.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await input.isDisabled()).toBe(true);
    });

    it('should mark the input readonly when #isReadonly is set', async () => {
        expect(await input.isReadonly()).toBe(false);
        component.isReadonly = true;

        fixture.detectChanges();
        expect(await input.isReadonly()).toEqual(true);
    });

    it('should have #name as label of the input', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'My Label';
        fixture.detectChanges();
        expect(await formField.getLabel()).toBe(component.name);
    });

    it('should have iban validator when isIban', async () => {
        const validIBAN: string = 'DE02370501980001802057';
        const invalidIBAN: string = 'DE0237050198000180205'; // last number 7 is removed

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(component.isIban).toBe(false);
        component.isIban = true;
        component.writeValue(validIBAN);
        fixture.detectChanges();

        expect(await formField.isControlValid()).toBeTruthy();

        component.writeValue(invalidIBAN);
        fixture.detectChanges();

        expect(await formField.isControlValid()).toBeFalsy();
    });

    it('should check whether the entered text is a valid email when input `email` is true', async () => {
        const validEmail: string = 'test@plentymarkets.com';
        const invalidEmail: string = 'test';

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(component.email).toBe(false);
        component.email = true;
        await input.setValue(validEmail);
        fixture.detectChanges();

        expect(await formField.isControlValid()).toBeTruthy();

        await input.setValue(invalidEmail);
        fixture.detectChanges();

        expect(await formField.isControlValid()).toBeFalsy();
    });

    it('should have the correct error message for emails ', async () => {
        const invalidEmail: string = 'test';

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(component.email).toBe(false);
        component.email = true;
        await input.setValue(invalidEmail);
        await input.blur();
        fixture.detectChanges();
        expect(await formField.hasErrors()).toBeTrue();

        const errors: Array<string> = await formField.getTextErrors();
        expect(errors.length).toBe(1);
        expect(errors[0]).toBe('terraTextInput.invalidEmail');
    });

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;
        beforeEach(() => {
            tooltip = fixture.debugElement.query(By.directive(MockTooltipDirective)).injector.get(MockTooltipDirective);
        });

        it('should apply the tcTooltip directive to the form field with the given #tooltipText', () => {
            expect(tooltip).toBeTruthy();
            expect(tooltip.tcTooltip).toBe('');

            component.tooltipText = 'My tooltip';
            fixture.detectChanges();

            expect(tooltip.tcTooltip).toBe(component.tooltipText);
        });

        it(`should set the tooltip's placement according to the input #tooltipPlacement`, () => {
            expect(tooltip.placement).toBe(TerraPlacementEnum.TOP);

            component.tooltipPlacement = TerraPlacementEnum.BOTTOM;
            fixture.detectChanges();

            expect(tooltip.placement).toBe(component.tooltipPlacement);
        });
    });

    it('should update the value of the input when writing a new value via `writeValue()`', async () => {
        const value: string = 'my test string';
        component.writeValue(value);

        fixture.detectChanges();
        expect(await input.getValue()).toEqual(value);
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        const value: string = 'my test string';
        await input.setValue(value);

        expect(onChangeCallback).toHaveBeenCalledWith(value);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await input.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should set min length validation according to input #minLength', async () => {
        const inputElement: TestElement = await input.host();

        component.minLength = 2;
        fixture.detectChanges();

        expect(await inputElement.getProperty('minLength')).toBe(component.minLength);
    });

    it('should set max length validation according to input #maxLength', async () => {
        const inputElement: TestElement = await input.host();

        component.maxLength = 10;
        fixture.detectChanges();

        expect(await inputElement.getProperty('maxLength')).toBe(component.maxLength);
    });

    it('should set pattern to the given one.', async () => {
        const inputElement: TestElement = await input.host();
        component.pattern = '^[0-9]';
        fixture.detectChanges();

        expect(await inputElement.getProperty('pattern')).toBe('^[0-9]');
    });

    it('should display an error message when input does not match the given pattern', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        component.pattern = '^[0-9]';

        await input.setValue('sdfsdfsdfs');
        await input.blur();
        fixture.detectChanges();

        let textErrors: Array<string> = await formField.getTextErrors();
        expect(textErrors.includes('validators.pattern')).toBeTrue();

        await input.setValue('3');
        await input.blur();
        fixture.detectChanges();

        textErrors = await formField.getTextErrors();
        expect(textErrors.length).toBe(0);
    });

    it('should only accept #maxLength amount of characters', async () => {
        const maxLength: number = 10;
        const validString: string = new Array(maxLength).fill('x').join('');
        const invalidString: string = new Array(maxLength + 1).fill('x').join('');
        component.maxLength = maxLength;

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        await input.setValue(validString);
        expect(await formField.isControlValid()).toBe(true);
        await input.setValue(invalidString);
        expect(await formField.isControlValid()).toBe(false);
    });

    it('should require #minLength amount of characters', async () => {
        const minLength: number = 5;
        const validString: string = new Array(minLength).fill('x').join('');
        const invalidString: string = new Array(minLength - 1).fill('x').join('');
        component.minLength = minLength;

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        await input.setValue(validString);
        expect(await formField.isControlValid()).toBe(true);
        await input.setValue(invalidString);
        expect(await formField.isControlValid()).toBe(false);
    });

    it('should have the correct error message for minLength ', async () => {
        const minLength: number = 5;
        const invalidString: string = new Array(minLength - 1).fill('x').join('');

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        component.minLength = minLength;
        await input.setValue(invalidString);
        await input.blur();
        fixture.detectChanges();
        expect(await formField.hasErrors()).toBeTrue();

        const errors: Array<string> = await formField.getTextErrors();
        expect(errors.includes('validators.minLength')).toBeTrue();
    });

    it('should have the correct error message for maxLength ', async () => {
        const maxLength: number = 5;
        const invalidString: string = new Array(maxLength + 1).fill('x').join('');

        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        component.maxLength = maxLength;
        await input.setValue(invalidString);
        await input.blur();
        fixture.detectChanges();
        expect(await formField.hasErrors()).toBeTrue();

        const errors: Array<string> = await formField.getTextErrors();
        expect(errors.includes('validators.maxLength')).toBeTrue();
    });
});
