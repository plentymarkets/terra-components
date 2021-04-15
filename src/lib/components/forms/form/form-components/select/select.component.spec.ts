import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { SelectComponent } from './select.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionHarness } from '@angular/material/core/testing';
import { SelectSortPipe } from '../../../../../pipes/select-sort.pipe';

describe('SelectComponent', () => {
    let fixture: ComponentFixture<SelectComponent>;
    let component: SelectComponent;
    let loader: HarnessLoader;
    let input: MatSelectHarness;

    let listBoxValue1: TerraSelectBoxValueInterface = {
        caption: 'Value 01',
        value: 1
    };

    let listBoxValue2: TerraSelectBoxValueInterface = {
        caption: 'Value 02',
        value: 2
    };

    let selectOptions: Array<TerraSelectBoxValueInterface> = [listBoxValue1, listBoxValue2];

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MatSelectModule, FormsModule, MatFormFieldModule, NoopAnimationsModule],
            declarations: [SelectComponent, SelectSortPipe, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        input = await loader.getHarness(MatSelectHarness);
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

    it('should set required validation when #isRequired is set', async () => {
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await input.isRequired()).toBe(true);
    });

    it('should set listBoxValues when #listBoxValues is set', async () => {
        expect(await input.getOptions()).toEqual([]);
        component.listBoxValues = selectOptions;
        fixture.detectChanges();

        expect(
            (await input.getOptions()).every(
                async (option: MatOptionHarness, index: number) =>
                    (await option.getText()) === selectOptions[index].caption
            )
        ).toBe(true);
    });

    it('should set ngModel Value to the one from writeValue()', async () => {
        expect(await input.getOptions()).toEqual([]);
        component.listBoxValues = selectOptions;
        component.writeValue(listBoxValue1.value);

        fixture.detectChanges();

        expect(await input.getValueText()).toBe(listBoxValue1.caption.toString());
    });

    it('should call registered onTouchedCallback when select blur has been called', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        await input.blur();

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

    it('should call registered onChangeCallback when the value has changed', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(spy);
        await input.clickOptions({
            text: listBoxValue1.caption.toString()
        });

        fixture.detectChanges();

        expect(spy).toHaveBeenCalledOnceWith(listBoxValue1.value);
    });
});
