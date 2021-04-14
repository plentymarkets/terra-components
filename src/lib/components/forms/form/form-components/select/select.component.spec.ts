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
            imports: [MatSelectModule, FormsModule, MatFormFieldModule],
            declarations: [SelectComponent, MockTooltipDirective]
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
        expect(await input.getOptions()).toBe([]);
        component.listBoxValues = selectOptions;
        fixture.detectChanges();

        expect(await input.getOptions()).toBe(selectOptions);
    });
});
