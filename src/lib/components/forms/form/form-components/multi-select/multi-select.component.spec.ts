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
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { PseudoCheckboxStatePipe } from './pipes/pseudo-checkbox-state.pipe';
import { L10nTranslationModule } from 'angular-l10n';
import { mockL10nConfig } from '../../../../../testing/mock-l10n-config';
import { MatDividerModule } from '@angular/material/divider';
import { MatPseudoCheckboxModule } from '@angular/material/core';

let multiSelectOption1: { caption: string; value: any } = {
    caption: 'Value 01',
    value: 1
};

let multiSelectOption2: { caption: string; value: any } = {
    caption: 'Value 02',
    value: 2
};

let multiSelectOption3: { caption: string; value: any } = {
    caption: 'Value 03',
    value: 3
};

let multiSelectOptions: Array<{ caption: string; value: any }> = [
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
            imports: [
                MatSelectModule,
                MatDividerModule,
                MatPseudoCheckboxModule,
                FormsModule,
                NoopAnimationsModule,
                L10nTranslationModule.forRoot(mockL10nConfig)
            ],
            declarations: [MultiSelectComponent, MockTooltipDirective, PseudoCheckboxStatePipe]
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

    it('should call the callback #registerOnChange whenever the user selects another option', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(spy);
        component.checkboxValues = multiSelectOptions;

        fixture.detectChanges();

        await select.open();
        await select.clickOptions({
            text: multiSelectOption1.caption.toString()
        });

        expect(spy).toHaveBeenCalledOnceWith([multiSelectOption1.value]);
    });

    it('should call the callback #registerOnTouched whenever the select was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await select.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should set the value from ngModel as from #writeValue', async () => {
        component.checkboxValues = multiSelectOptions;
        component.writeValue([multiSelectOption1.value, multiSelectOption2.value]);

        fixture.detectChanges();

        expect(await select.getValueText()).toBe([multiSelectOption1.caption, multiSelectOption2.caption].join(', '));
    });

    it('should render options as given via the #checkboxValues input', async () => {
        expect(await select.getOptions()).toEqual([]);
        component.checkboxValues = multiSelectOptions;
        fixture.detectChanges();

        await select.open();
        // need to use a custom selector here, since the harness also recognizes the "select all" element as an option
        const options: Array<MatOptionHarness> = await select.getOptions({ selector: '.mat-option:not(.select-all)' });
        expect(options.length).toBe(multiSelectOptions.length);
        expect(
            options.every(
                async (option: MatOptionHarness, index: number) =>
                    (await option.getText()) === multiSelectOptions[index].caption
            )
        ).toBe(true);
    });

    it('should preserve the order of the available options in the list of selected values', async () => {
        expect(await select.getOptions()).toEqual([]);

        // initialization
        component.checkboxValues = multiSelectOptions;
        component.writeValue([multiSelectOptions[0].value, multiSelectOptions[2].value]);
        fixture.detectChanges();

        // register spy
        const onChangeSpy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(onChangeSpy);

        // select checkbox
        await select.open();
        expect((await select.getOptions({ isSelected: true })).length).toBe(2);

        await select.clickOptions({
            text: multiSelectOptions[1].caption
        });

        // check order of select option values
        expect(onChangeSpy).toHaveBeenCalledWith([
            multiSelectOptions[0].value,
            multiSelectOptions[1].value,
            multiSelectOptions[2].value
        ]);
    });

    it(`should pass 'null' to the change callback when there's nothing selected anymore`, async () => {
        component.checkboxValues = multiSelectOptions;
        component.writeValue([multiSelectOption1.value]);
        fixture.detectChanges();

        await select.open();
        expect((await select.getOptions({ isSelected: true })).length).toBe(1);

        const onChangeSpy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(onChangeSpy);

        await select.clickOptions({
            text: multiSelectOption1.caption
        });

        expect((await select.getOptions({ isSelected: true })).length).toBe(0);
        expect(onChangeSpy).toHaveBeenCalledWith(null);
    });

    it('should select all options when clicked on the "select all" option and not all options are selected yet', async () => {
        component.checkboxValues = multiSelectOptions;
        component.writeValue([]);
        fixture.detectChanges();

        await select.open();
        const selectAllOption: HTMLDivElement = fixture.debugElement.query(By.css('.mat-option.select-all'))
            .nativeElement;
        selectAllOption.click();

        expect(component.value).toEqual(
            multiSelectOptions.map((option: { caption: string; value: any }) => option.value)
        );
    });

    it('should deselect all options when clicked on the "select all" option and all options are selected', async () => {
        component.checkboxValues = multiSelectOptions;
        component.writeValue(multiSelectOptions.map((option: { caption: string; value: any }) => option.value));
        fixture.detectChanges();

        await select.open();
        const selectAllOption: HTMLDivElement = fixture.debugElement.query(By.css('.mat-option.select-all'))
            .nativeElement;
        selectAllOption.click();

        expect(component.value).toEqual([]);
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
