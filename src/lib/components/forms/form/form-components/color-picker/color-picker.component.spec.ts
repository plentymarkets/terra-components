import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';
import { L10N_LOCALE, L10nTranslationModule, L10nTranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../../../../testing/mock-translation-service';

describe('ColorPickerComponent', () => {
    let fixture: ComponentFixture<ColorPickerComponent>;
    let component: ColorPickerComponent;
    let loader: HarnessLoader;
    let input: MatInputHarness;

    const testColor: string = '#f8f8f8';

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
            declarations: [ColorPickerComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(ColorPickerComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        input = await loader.getHarness(MatInputHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
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

    it('should update the value of the input when writing a new value via `writeValue()`', async () => {
        component.writeValue(testColor);

        fixture.detectChanges();
        expect(await input.getValue()).toEqual(testColor);
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await input.isRequired()).toBe(true);
    });

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;
        const testToolTipCaption: string = 'testToolTip';

        beforeEach(() => {
            tooltip = fixture.debugElement.query(By.directive(MockTooltipDirective)).injector.get(MockTooltipDirective);
        });

        it('should set tooltip placement according to #tooltipPlacement', () => {
            expect(tooltip.placement).toBe(TerraPlacementEnum.TOP);
            component.tooltipPlacement = TerraPlacementEnum.RIGHT;
            fixture.detectChanges();
            expect(tooltip.placement).toBe(TerraPlacementEnum.RIGHT);
        });

        it('should set tooltiptext according to #tooltipText', () => {
            expect(tooltip.tcTooltip).toBeFalsy();
            component.tooltipText = testToolTipCaption;
            fixture.detectChanges();
            expect(tooltip.tcTooltip).toBe(testToolTipCaption);
        });
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        await input.setValue(testColor);

        expect(onChangeCallback).toHaveBeenCalledWith(testColor);
    });

    it('should call registered onTouchedCallback when input was blurred', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        await input.blur();

        expect(spy).toHaveBeenCalled();
    });

    it('should display an error message when input does not match the hex colour pattern', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);

        await input.setValue('#ffffff');
        await input.blur();
        fixture.detectChanges();

        let textErrors: Array<string> = await formField.getTextErrors();

        expect(textErrors.length).toBe(0);

        await input.setValue('invalid stuff');
        await input.blur();
        fixture.detectChanges();

        textErrors = await formField.getTextErrors();

        expect(textErrors.includes('validators.patternHex')).toBeTrue();
    });
});
