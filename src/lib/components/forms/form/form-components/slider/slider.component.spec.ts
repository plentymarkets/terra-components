import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';

describe('SliderComponent', () => {
    let fixture: ComponentFixture<SliderComponent>;
    let component: SliderComponent;
    let loader: HarnessLoader;
    let slider: MatSliderHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatSliderModule, NoopAnimationsModule, FormsModule],
            declarations: [SliderComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(SliderComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        slider = await loader.getHarness(MatSliderHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(slider).toBeTruthy();
    });

    it('should disable the input when #isDisabled is set', async () => {
        expect(await slider.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await slider.isDisabled()).toBe(true);
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

    it('should call registered onTouchedCallback when input was blurred', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        await slider.blur();

        expect(spy).toHaveBeenCalled();
    });

    it('should set min/max values', async () => {
        const minValue: number = 10;
        const maxValue: number = 100;

        component.min = minValue;
        component.max = maxValue;
        fixture.detectChanges();
        expect(await slider.getMinValue()).toEqual(minValue);
        expect(await slider.getMaxValue()).toEqual(maxValue);
    });

    it('should format value displayed as thumb label according to given #precision, async () => {
        component.precision = 2;
        component.writeValue(40.1234);
        fixture.detectChanges();
        expect(await slider.getDisplayValue()).toEqual('40.12');
    });

    it('should show ticks depending on input `showTicks`', async () => {
        const inputHost: TestElement = await slider.host();

        expect(await inputHost.hasClass('mat-slider-has-ticks')).toBeFalse();

        component.showTicks = true;
        fixture.detectChanges();

        expect(await inputHost.hasClass('mat-slider-has-ticks')).toBeTrue();
    });

    it('should set mat slider step when interval is set', () => {
        const stepSize: number = 2;
        component.interval = stepSize;

        const slider: MatSlider = fixture.debugElement.query(By.directive(MatSlider)).componentInstance;
        fixture.detectChanges();

        expect(slider.step).toBe(stepSize);
    });
});
