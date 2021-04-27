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
import { TerraPlacementEnum } from '../../../../../helpers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { L10N_LOCALE } from 'angular-l10n';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

// tslint:disable-next-line:max-function-line-count
describe('DatePickerComponent', () => {
    let fixture: ComponentFixture<DatePickerComponent>;
    let component: DatePickerComponent;
    let loader: HarnessLoader;
    let datepicker: MatDatepickerInputHarness;
    const today: Moment = moment(new Date().setHours(0, 0, 0, 0));

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, NoopAnimationsModule, FormsModule],
            declarations: [DatePickerComponent, MockTooltipDirective],
            providers: [
                {
                    provide: L10N_LOCALE,
                    useValue: { language: 'de' }
                }
            ]
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

    it('should update the value of the datepicker when writing a new value via `writeValue()`', async () => {
        const value: string = today.format();

        component.writeValue(value);
        fixture.detectChanges();
        expect(await datepicker.getValue()).toEqual(today.format('D.M.Y'));
    });

    it('should call registered change callback whenever the value of the datepicker is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        const value: string = today.format('D.M.Y');
        await datepicker.setValue(value);
        expect(onChangeCallback).toHaveBeenCalled();
        // since datePicker Harness simulates entering a date by pressing keys the change callback is called multiple times
        expect(onChangeCallback.calls.mostRecent().args[0]).toBe(today.format());
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await datepicker.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should format displayed value according to the given displayDateFormat', async () => {
        const value: string = today.format();
        const displayFormat: string = 'YYYY-MM-DD';
        component.displayDateFormat = displayFormat;
        component.writeValue(value);
        fixture.detectChanges();

        expect(await datepicker.getValue()).toEqual(today.format(displayFormat));
    });

    afterEach(() => {
        const dateFormat: MatDateFormats = fixture.debugElement.injector.get(MAT_DATE_FORMATS);
        dateFormat.display = {
            dateInput: 'l',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY'
        };
    });
});
