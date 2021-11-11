import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader, TestElement } from '@angular/cdk/testing';
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
import { L10N_LOCALE, L10nTranslationModule, L10nTranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../../../../testing/mock-translation-service';

describe('SelectComponent', () => {
    let fixture: ComponentFixture<SelectComponent>;
    let component: SelectComponent;
    let loader: HarnessLoader;
    let select: MatSelectHarness;

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
            imports: [MatSelectModule, FormsModule, MatFormFieldModule, NoopAnimationsModule, L10nTranslationModule],
            providers: [
                {
                    provide: L10nTranslationService,
                    useClass: MockTranslationService
                },
                {
                    provide: L10N_LOCALE,
                    useValue: { language: 'de' }
                }
            ],
            declarations: [SelectComponent, SelectSortPipe, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        fixture.detectChanges();

        select = await loader.getHarness(MatSelectHarness);
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
        expect(select).toBeTruthy();
    });

    it('should disable the select when #isDisabled is set', async () => {
        expect(await select.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await select.isDisabled()).toBe(true);
    });

    it('should have #name as label of the select', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'My Label';
        fixture.detectChanges();
        expect(await formField.getLabel()).toBe(component.name);
    });

    it('should set required validation when #isRequired is set', async () => {
        expect(await select.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await select.isRequired()).toBe(true);
    });

    it('should set listBoxValues when #listBoxValues is set', async () => {
        expect(await select.getOptions()).toEqual([]);
        component.listBoxValues = selectOptions;
        fixture.detectChanges();

        await select.open();
        const options: Array<MatOptionHarness> = await select.getOptions();
        expect(options.length).toBe(selectOptions.length);
        expect(
            options.every(
                async (option: MatOptionHarness, index: number) =>
                    (await option.getText()) === selectOptions[index].caption
            )
        ).toBe(true);
    });

    it('should set ngModel Value to the one from writeValue()', async () => {
        component.listBoxValues = selectOptions;
        component.writeValue(listBoxValue1.value);

        fixture.detectChanges();

        expect(await select.getValueText()).toBe(listBoxValue1.caption.toString());
    });

    it('should call registered onTouchedCallback when select blur has been called', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        await select.blur();

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

    it('should call registered onChangeCallback when the value has changed', async () => {
        const spy: jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(spy);
        component.listBoxValues = selectOptions;

        fixture.detectChanges();

        await select.clickOptions({
            text: listBoxValue1.caption.toString()
        });

        expect(spy).toHaveBeenCalledOnceWith(listBoxValue1.value);
    });

    it('should sort select options by position if given', async () => {
        expect(await select.getOptions()).toEqual([]);

        component.listBoxValues = [
            {
                caption: 'position-3',
                value: 3,
                position: 3
            },
            {
                caption: 'position-1',
                value: 1,
                position: 1
            },
            {
                caption: 'position-2',
                value: 2,
                position: 2
            }
        ];

        fixture.detectChanges();

        await select.open();
        const options: Array<MatOptionHarness> = await select.getOptions();
        expect(
            options.every(
                async (option: MatOptionHarness, index: number) => (await option.getText()) === 'position-' + index + 1
            )
        ).toBe(true);
    });

    it(`should color the option's text according to the color given via 'TerraSelectBoxValueInterface'`, async () => {
        component.listBoxValues = [{ caption: 'colored', value: 1, color: 'rgb(1, 2, 3)' as any }];
        fixture.detectChanges();

        await select.open();
        const options: Array<MatOptionHarness> = await select.getOptions();
        const option: MatOptionHarness = options[0];
        const host: TestElement = await option.host();
        expect(await host.getCssValue('color')).toBe(component.listBoxValues[0].color);
    });
});
