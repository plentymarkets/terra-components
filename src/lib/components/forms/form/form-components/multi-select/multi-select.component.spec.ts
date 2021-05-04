import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from './multi-select.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { FormsModule } from '@angular/forms';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { TerraPlacementEnum } from '../../../../../helpers';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectSortPipe } from '../../../../../pipes/select-sort.pipe';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { TerraMultiCheckBoxValueInterface } from '../../../multi-check-box/data/terra-multi-check-box-value.interface';

let multiSelectOption1: TerraMultiCheckBoxValueInterface = {
    caption: 'Value 01',
    value: 1,
    selected: false
};

let multiSelectOption2: TerraMultiCheckBoxValueInterface = {
    caption: 'Value 02',
    value: 2,
    selected: false
};

let multiSelectOption3: TerraMultiCheckBoxValueInterface = {
    caption: 'Value 03',
    value: 3,
    selected: false
};

let multiSelectOptions: Array<TerraMultiCheckBoxValueInterface> = [
    multiSelectOption1,
    multiSelectOption2,
    multiSelectOption3
];

// tslint:disable-next-line:max-function-line-count
describe('MultiSelectComponent', () => {
    let component: MultiSelectComponent;
    let fixture: ComponentFixture<MultiSelectComponent>;
    let loader: HarnessLoader;
    let select: MatSelectHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatSelectModule, FormsModule, MatFormFieldModule, NoopAnimationsModule],
            declarations: [MultiSelectComponent, MockTooltipDirective, SelectSortPipe]
        });

        fixture = TestBed.createComponent(MultiSelectComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        select = await loader.getHarness(MatSelectHarness);
    });

    it('should create instances', async () => {
        expect(component).toBeTruthy();
        expect(select).toBeTruthy();
    });

    it('should check whether the select is in multi-selection mode', async () => {
        expect(await select.isMultiple()).toBe(true);
    });

    it('should disable the select when #isDisabled is set', async () => {
        expect(await select.isDisabled()).toBe(false);

        component.isDisabled = true;
        fixture.detectChanges();

        expect(await select.isDisabled()).toBe(true);
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await select.isRequired()).toBe(false);

        component.isRequired = true;
        fixture.detectChanges();

        expect(await select.isRequired()).toBe(true);
    });

    it('should set #name as label of the select', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'Ma Label';
        fixture.detectChanges();

        expect(await formField.getLabel()).toBe(component.name);
    });

    it('should call the callback #registerOnChange whenever the value of an option is changed by the user', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(spy);
        component.listBoxValues = multiSelectOptions;

        fixture.detectChanges();

        await select.clickOptions({
            text: multiSelectOption1.caption.toString(),
            isSelected: true
        });

        expect(spy).toHaveBeenCalledOnceWith(multiSelectOption1.value, true);
    });

    it('should call the callback #registerOnTouched whenever the select was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await select.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should set the value from ngModel as from #writeValue', async () => {
        component.listBoxValues = multiSelectOptions;
        component.writeValue([multiSelectOption1.value, multiSelectOption2.value]);

        fixture.detectChanges();

        expect(await select.getValueText()).toBe([multiSelectOption1.value, multiSelectOption2.value].toString());
    });

    it('should set selectValues from listBoxValues', async () => {
        expect(await select.getOptions()).toEqual([]);
        component.listBoxValues = multiSelectOptions;
        fixture.detectChanges();

        await select.open();
        const options: Array<MatOptionHarness> = await select.getOptions();
        expect(options.length).toBe(multiSelectOptions.length);
        expect(
            options.every(
                async (option: MatOptionHarness, index: number) =>
                    (await option.getText()) === multiSelectOptions[index].caption
            )
        ).toBe(true);
    });

    it('should sort order when checkboxes are selected/deselected', async () => {
        expect(await select.getOptions()).toEqual([]);

        // initialization
        component.listBoxValues = multiSelectOptions;
        component.writeValue([multiSelectOptions[0].value, multiSelectOptions[2].value]);
        fixture.detectChanges();

        // register spy
        const onChangeSpy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(onChangeSpy);

        fixture.detectChanges();

        // select checkbox
        await select.open();
        await select.clickOptions({
            text: multiSelectOption1.caption.toString(),
            isSelected: true
        });

        // check order of select option values
        expect(onChangeSpy).toHaveBeenCalledWith([
            multiSelectOptions[0].value,
            multiSelectOptions[1].value,
            multiSelectOptions[2].value
        ]);
    });

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;

        beforeEach(() => {
            tooltip = fixture.debugElement.query(By.directive(MockTooltipDirective)).injector.get(MockTooltipDirective);
        });

        it('should set the tooltip placement as #tooltipPlacement', () => {
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
});
