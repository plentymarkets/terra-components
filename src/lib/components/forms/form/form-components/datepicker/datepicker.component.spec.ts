import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './datepicker.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

// tslint:disable-next-line:max-function-line-count
fdescribe('DatePickerComponent', () => {
    let fixture: ComponentFixture<DatePickerComponent>;
    let component: DatePickerComponent;
    let loader: HarnessLoader;
    let datepicker: MatDatepickerInputHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                MatDatepickerModule,
                NoopAnimationsModule,
                MatNativeDateModule,
                FormsModule
            ],
            declarations: [DatePickerComponent, MockTooltipDirective],
            providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de-DE' }]
        });

        fixture = TestBed.createComponent(DatePickerComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();
        datepicker = await loader.getHarness(MatDatepickerInputHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(datepicker).toBeTruthy();
    });

    it('should have #name as label of the input', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'My label';
        fixture.detectChanges();
        expect(await formField.getLabel()).toBe(component.name);
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await datepicker.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await datepicker.isRequired()).toBe(true);
    });

    it('should disable the input when #isDisabled is set', async () => {
        expect(await datepicker.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await datepicker.isDisabled()).toBe(true);
    });

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;
        beforeEach(() => {
            tooltip = fixture.debugElement.query(By.directive(MockTooltipDirective)).injector.get(MockTooltipDirective);
        });

        it('should apply the tcTooltip directive to the form field with the given #tooltipText', () => {
            expect(tooltip).toBeTruthy();
            expect(tooltip.tcTooltip).toBeFalsy();

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

    fit('should update the value of the datepicker when writing a new value via `writeValue()`', async () => {
        const value: string = '03.04.2020';
        const date: Date = new Date(2017, 1, 1);
        component.writeValue('03.04.2020');
        fixture.detectChanges();
        expect(await datepicker.getValue()).toEqual(value);
    });

    it('should call registered change callback whenever the value of the datepicker is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        const value: string = '03.04.2020';
        await datepicker.setValue(value);

        expect(onChangeCallback).toHaveBeenCalledWith(value);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await datepicker.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });
});
