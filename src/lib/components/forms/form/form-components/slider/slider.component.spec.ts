import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';
import { TickIntervalPipe } from './pipes/tick-interval.pipe';

describe('SliderComponent', () => {
    let fixture: ComponentFixture<SliderComponent>;
    let component: SliderComponent;
    let loader: HarnessLoader;
    let slider: MatSliderHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatSliderModule, NoopAnimationsModule, FormsModule],
            declarations: [SliderComponent, TickIntervalPipe, MockTooltipDirective]
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

    it('should disable the slider when #isDisabled is set', async () => {
        expect(await slider.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await slider.isDisabled()).toBe(true);
    });

    it('should have #name as label', async () => {
        const testLabel: string = 'My Label';
        component.name = testLabel;

        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.debugElement.nativeElement;
        const label: HTMLLabelElement = nativeElement.querySelector('label');

        expect(label.textContent).toEqual(testLabel);
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

    it('should call registered onTouchedCallback when slider was blurred', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        await slider.blur();

        expect(spy).toHaveBeenCalled();
    });

    it('should call registered change callback whenever the value of the slider is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        const testValue: number = 2.0;
        await slider.setValue(testValue);

        expect(onChangeCallback).toHaveBeenCalledWith(testValue);
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

    it('should format value displayed as thumb label according to given #precision', async () => {
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

    it(`should set the slider's step property according to given #interval`, () => {
        const stepSize: number = 2;
        component.interval = stepSize;

        const sliderComponent: MatSlider = fixture.debugElement.query(By.directive(MatSlider)).componentInstance;
        fixture.detectChanges();

        expect(sliderComponent.step).toBe(stepSize);
    });

    it(`should show min/max values in template`, () => {
        const minValue: number = 10;
        const maxValue: number = 100;

        component.min = minValue;
        component.max = maxValue;
        component.showMinMax = true;
        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.debugElement.nativeElement;
        const spanList: NodeList = nativeElement.querySelectorAll('span');

        // min value
        expect(spanList[0].textContent).toBe(minValue.toString());

        // max value
        expect(spanList[2].textContent).toBe(maxValue.toString());
    });
});
