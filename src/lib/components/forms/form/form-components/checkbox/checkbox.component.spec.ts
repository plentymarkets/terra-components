import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';

// tslint:disable-next-line:max-function-line-count
describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let loader: HarnessLoader;
    let checkbox: MatCheckboxHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatCheckboxModule],
            declarations: [CheckboxComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        checkbox = await loader.getHarness(MatCheckboxHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(checkbox).toBeTruthy();
    });

    it('should disable the checkbox when #isDisabled is set', async () => {
        expect(await checkbox.isDisabled()).toBe(false);

        component.isDisabled = true;
        fixture.detectChanges();

        expect(await checkbox.isDisabled()).toBe(true);
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await checkbox.isRequired()).toBe(false);

        component.isRequired = true;
        fixture.detectChanges();

        expect(await checkbox.isRequired()).toBe(true);
    });

    it('should set #name as label', async () => {
        expect(await checkbox.getLabelText()).toBe('');

        component.name = 'My label';
        fixture.detectChanges();

        expect(await checkbox.getLabelText()).toBe('My label');
    });

    it('should call the callback #registerOnChange whenever the value of the checkbox is changed by the user', async () => {
        expect(await checkbox.isChecked()).toBe(false);

        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        await checkbox.check();

        expect(onChangeCallback).toHaveBeenCalled();
    });

    it('should call the callback #registerOnTouched whenever the checkbox was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await checkbox.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should set the value as from #writeValue', async () => {
        const value: boolean = true;
        component.writeValue(value);
        expect(component.value).toEqual(value);

        fixture.detectChanges();

        expect(await checkbox.getValue()).toEqual(value.toString());
    });

    it('should have state inderterminate when isIndeterminate ', async () => {
        expect(await checkbox.isIndeterminate()).toBe(false);
        component.isIndeterminate = true;
        fixture.detectChanges();

        expect(await checkbox.isIndeterminate()).toBe(true);
    });

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;

        beforeEach(() => {
            tooltip = fixture.debugElement.query(By.directive(MockTooltipDirective)).injector.get(MockTooltipDirective);
        });

        it('should set the tooltip placement as ##tooltipPlacement', () => {
            expect(tooltip.placement).toBe(TerraPlacementEnum.TOP);
            component.tooltipPlacement = TerraPlacementEnum.BOTTOM;
            fixture.detectChanges();

            expect(tooltip.placement).toBe(TerraPlacementEnum.BOTTOM);
        });

        it('should set tooltipText as #tooltipText', () => {
            expect(tooltip.tcTooltip).toBeFalsy();
            component.tooltipText = 'test';
            fixture.detectChanges();

            expect(tooltip.tcTooltip).toBe('test');
        });
    });

    it('should set icon as #icon', () => {
        const icon: string = 'icon-add';
        component.icon = icon;
        fixture.detectChanges();

        expect(component.icon).toEqual(icon);
    });
});
