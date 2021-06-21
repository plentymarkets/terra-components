import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TerraPlacementEnum } from '../../../../../helpers';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TextAreaComponent } from './text-area.component';
import { L10N_LOCALE, L10nTranslationModule, L10nTranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../../../../testing/mock-translation-service';

// tslint:disable-next-line: max-function-line-count
describe('TextAreaComponent', () => {
    let component: TextAreaComponent;
    let fixture: ComponentFixture<TextAreaComponent>;
    let loader: HarnessLoader;
    let input: MatInputHarness;
    let host: TestElement;

    const testString: string = 'foo';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TextAreaComponent],
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
            imports: [FormsModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule, L10nTranslationModule]
        }).compileComponents();
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;

        loader = TestbedHarnessEnvironment.loader(fixture);
        input = await loader.getHarness(MatInputHarness);
        host = await input.host();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
    });

    it('should have type textarea', async () => {
        expect(await input.getType()).toBe('textarea');
        expect(await host.matchesSelector('textarea')).toBe(true);
    });

    it('should set name as mat-label', async () => {
        component.name = testString;
        fixture.detectChanges();
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);

        expect(await formField.getLabel()).toBe(testString);
    });

    it('should set required state according to #isRequired', async () => {
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();
        expect(await input.isRequired()).toBe(true);
    });

    it('should set disabled state according to #isDisabled', async () => {
        expect(await input.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();
        expect(await input.isDisabled()).toBe(true);
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

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;

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
            component.tooltipText = testString;
            fixture.detectChanges();
            expect(tooltip.tcTooltip).toBe(testString);
        });
    });

    it('should have a default value of 4 for maxRows', async () => {
        expect(await host.getProperty('rows')).toBe(4);
    });

    it('should set property `rows` according to input #maxRows but with at least 4', async () => {
        expect(await host.getProperty('rows')).toBe(4);

        component.maxRows = 6;
        fixture.detectChanges();
        expect(await host.getProperty('rows')).toBe(6);
    });

    it('should set resize style according to #hasFixedHeight', async () => {
        expect(await host.getCssValue('resize')).toBe('vertical');

        component.hasFixedHeight = true;
        fixture.detectChanges();
        expect(await host.getCssValue('resize')).toBe('none');
    });

    it('should set property `maxlength` according to input #maxLength', async () => {
        expect(await host.getProperty('maxLength')).toBe(-1);
        component.maxLength = 10;
        fixture.detectChanges();
        expect(await host.getProperty('maxLength')).toBe(10);
    });

    it('should set property `minLength` according to input #minLength', async () => {
        expect(await host.getProperty('minLength')).toBe(-1);
        component.minLength = 10;
        fixture.detectChanges();
        expect(await host.getProperty('minLength')).toBe(10);
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        await input.setValue(testString);

        expect(onChangeCallback).toHaveBeenCalledWith(testString);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await input.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should update the value of the input when writing a new value via `writeValue()`', async () => {
        const value: string = 'my test string';
        component.writeValue(value);

        fixture.detectChanges();
        expect(await input.getValue()).toEqual(value);
    });
});
