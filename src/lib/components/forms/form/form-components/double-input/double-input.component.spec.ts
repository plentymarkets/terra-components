import { DoubleInputComponent } from './double-input.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { TerraRegex } from '../../../../../helpers/regex/terra-regex';
import { L10N_LOCALE, L10nTranslationModule, L10nTranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../../../../testing/mock-translation-service';

// tslint:disable-next-line:max-function-line-count
describe('DoubleInputComponent', () => {
    let component: DoubleInputComponent;
    let fixture: ComponentFixture<DoubleInputComponent>;
    let loader: HarnessLoader;
    let input: MatInputHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule, FormsModule, L10nTranslationModule],
            providers: [
                {
                    provide: L10nTranslationService,
                    useClass: MockTranslationService
                },
                {
                    provide: L10N_LOCALE,
                    useValue: { language: 'de' }
                }
            ],
            declarations: [DoubleInputComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(DoubleInputComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();

        input = await loader.getHarness(MatInputHarness);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
    });

    it('should have type number', async () => {
        expect(await input.getType()).toBe('number');
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

    it('should have #name as label of the input', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'My Label';
        fixture.detectChanges();

        expect(await formField.getLabel()).toBe(component.name);
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
        const value: number = 2.0;
        component.writeValue(value);
        fixture.detectChanges();

        expect(await input.getValue()).toEqual(value.toString());
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        const value: number = 2.0;
        await input.setValue(value.toString());

        expect(onChangeCallback).toHaveBeenCalledWith(value);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await input.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should be invalid when #decimalCount is disregarded', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.isControlValid()).toBe(true);
        component.writeValue(2.3422);
        component.decimalCount = 3;
        fixture.detectChanges();

        expect(await formField.isControlValid()).toBe(false);
    });

    it('should be right aligned if #isPriceInput is set', async () => {
        const host: TestElement = await input.host();
        expect(await host.getCssValue('text-align')).toBe('left');

        component.isPriceInput = true;
        fixture.detectChanges();

        expect(await host.getCssValue('text-align')).toBe('right');
    });

    it('should have the right pattern when decimalCount is set', async () => {
        const host: TestElement = await input.host();
        expect(await host.getProperty('pattern')).toBe(TerraRegex.getDouble(2));
        component.decimalCount = 3;
        fixture.detectChanges();

        expect(await host.getProperty('pattern')).toBe(TerraRegex.getDouble(3));
    });

    it('should have the right step when decimalCount is set', async () => {
        const host: TestElement = await input.host();
        expect(await host.getProperty('step')).toBe('0.01');
        component.decimalCount = 3;
        fixture.detectChanges();

        expect(await host.getProperty('step')).toBe('0.001');
    });

    it('should display an error message when pattern does not match', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);

        component.writeValue(0.01);
        await input.blur();
        fixture.detectChanges();

        let textErrors: Array<string> = await formField.getTextErrors();

        expect(textErrors.length).toBe(0);

        component.writeValue(0.0000000001);
        await input.blur();
        fixture.detectChanges();

        textErrors = await formField.getTextErrors();

        expect(textErrors.includes('validators.patternDecimalCount')).toBeTrue();
    });
});
