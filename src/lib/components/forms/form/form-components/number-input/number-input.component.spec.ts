import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberInputComponent } from './number-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';

describe('NumberInputComponent', () => {
    let fixture: ComponentFixture<NumberInputComponent>;
    let component: NumberInputComponent;
    let loader: HarnessLoader;
    let input: MatInputHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule, FormsModule],
            declarations: [NumberInputComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(NumberInputComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        input = await loader.getHarness(MatInputHarness);
    });

    it('should create', async () => {
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
            expect(tooltip.tcTooltip).toBeUndefined();

            component.tooltipText = 'My tooltip';
            fixture.detectChanges();

            expect(tooltip.tcTooltip).toBe(component.tooltipText);
        });

        it(`should set the tooltip's placement according to the input #tooltipPlacement`, () => {
            expect(tooltip.placement).toBeUndefined();

            component.tooltipPlacement = TerraPlacementEnum.BOTTOM;
            fixture.detectChanges();

            expect(tooltip.placement).toBe(component.tooltipPlacement);
        });
    });

    it('should set min value validation according to input #minValue', () => {
        const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputElement.min).toBe('undefined');

        component.minValue = 2;
        fixture.detectChanges();

        expect(+inputElement.min).toBe(component.minValue);
    });

    it('should set max value validation according to input #minValue', () => {
        const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputElement.max).toBe('undefined');

        component.maxValue = 10;
        fixture.detectChanges();

        expect(+inputElement.max).toBe(component.maxValue);
    });

    it('should update the value of the input when writing a new value via `writeValue()`', async () => {
        const value: number = 4;
        component.writeValue(value);
        expect(component.value).toEqual(value);

        fixture.detectChanges();
        expect(await input.getValue()).toEqual(value.toString());
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        const value: number = 2;
        await input.setValue(value.toString());

        expect(onChangeCallback).toHaveBeenCalledWith(value);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await input.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });
});
