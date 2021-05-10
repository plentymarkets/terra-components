import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionComponent } from './suggestion.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { By } from '@angular/platform-browser';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';

// tslint:disable-next-line:max-function-line-count
describe('SuggestionComponent', () => {
    let component: SuggestionComponent;
    let fixture: ComponentFixture<SuggestionComponent>;
    let loader: HarnessLoader;
    let autoComplete: MatAutocompleteHarness;
    const suggestionOption1: TerraSuggestionBoxValueInterface = {
        caption: 'Apple',
        value: 1,
        icon: 'icon-add',
        imgsrc: 'src'
    };

    const suggestionOption2: TerraSuggestionBoxValueInterface = {
        caption: 'Banana',
        value: 2
    };

    const suggestionOption3: TerraSuggestionBoxValueInterface = {
        caption: 'Raspberries',
        value: 3
    };

    const suggestionOptions: Array<TerraSuggestionBoxValueInterface> = [
        suggestionOption1,
        suggestionOption2,
        suggestionOption3
    ];

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatIconModule
            ],
            declarations: [SuggestionComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(SuggestionComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        autoComplete = await loader.getHarness(MatAutocompleteHarness);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(autoComplete).toBeTruthy();
    });

    it('should have #name as label of the input', async () => {
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        expect(await formField.getLabel()).toBe('');

        component.name = 'My Label';
        fixture.detectChanges();
        expect(await formField.getLabel()).toBe(component.name);
    });

    it('should set required validation when #isRequired is set', async () => {
        let input: MatInputHarness = await loader.getHarness(MatInputHarness);
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await input.isRequired()).toBe(true);
    });

    it('should disable the input when #isDisabled is set', async () => {
        expect(await autoComplete.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await autoComplete.isDisabled()).toBe(true);
    });

    describe('with tooltip', () => {
        let tooltip: MockTooltipDirective;
        beforeEach(() => {
            tooltip = fixture.debugElement.query(By.directive(MockTooltipDirective)).injector.get(MockTooltipDirective);
        });

        it('should apply the tcTooltip directive to the form field with the given #tooltipText', () => {
            expect(tooltip).toBeTruthy();
            expect(tooltip.tcTooltip).toBe('');

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

    it('should update the value of the input when writing a new value via `writeValue()`', async () => {
        component.listBoxValues = suggestionOptions;
        component.writeValue(suggestionOption1.value);

        fixture.detectChanges();
        expect(await autoComplete.getValue()).toBe(suggestionOption1.caption);
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);
        component.listBoxValues = suggestionOptions;
        component._autoCompleteOpened.next(); // this needs to be done in order to get the full list of options displayed..
        fixture.detectChanges();

        const autocompleteTrigger: MatAutocompleteTrigger = fixture.debugElement
            .query(By.directive(MatAutocompleteTrigger))
            .injector.get(MatAutocompleteTrigger);
        autocompleteTrigger.openPanel();
        await autoComplete.selectOption({ text: suggestionOption1.caption });

        expect(onChangeCallback).toHaveBeenCalledWith(suggestionOption1.value);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await autoComplete.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });

    it('should render options as given via the #listBoxValues input', async () => {
        expect(await autoComplete.getOptions()).toEqual([]);
        component.listBoxValues = suggestionOptions;
        component._autoCompleteOpened.next();
        fixture.detectChanges();

        const autocompleteTrigger: MatAutocompleteTrigger = fixture.debugElement
            .query(By.directive(MatAutocompleteTrigger))
            .injector.get(MatAutocompleteTrigger);
        autocompleteTrigger.openPanel();

        const options: Array<MatOptionHarness> = await autoComplete.getOptions();
        expect(options.length).toBe(suggestionOptions.length);
        expect(
            options.every(
                async (option: MatOptionHarness, index: number) =>
                    (await option.getText()) === suggestionOptions[index].caption
            )
        ).toBe(true);
    });

    it('should focus and blur the autocomplete', async () => {
        expect(await autoComplete.isFocused()).toBe(false);
        await autoComplete.focus();
        expect(await autoComplete.isFocused()).toBe(true);
        await autoComplete.blur();
        expect(await autoComplete.isFocused()).toBe(false);
    });

    fit('should set icon', async () => {
        component.listBoxValues = suggestionOptions;
        component._autoCompleteOpened.next();
        fixture.detectChanges();

        const autocompleteTrigger: MatAutocompleteTrigger = fixture.debugElement
            .query(By.directive(MatAutocompleteTrigger))
            .injector.get(MatAutocompleteTrigger);
        autocompleteTrigger.openPanel();
        await autoComplete.enterText('Apple');
        const icon: MatIconHarness = await loader.getHarness(MatIconHarness);

        expect(await icon.getName()).toEqual(suggestionOption1.icon);
        expect(await icon.getNamespace()).toEqual('plentyicons');
    });

    //xit('should set img', async () => {
    //    component.listBoxValues = suggestionOptions;
    //    fixture.detectChanges();
    //
    //    await autoComplete.enterText('Apple');
    //    await autoComplete.focus();
    //    await autoComplete.selectOption({ text: suggestionOption1.caption });
    //    const img: MatIconHarness = await loader.getHarness();
    //
    //    expect(await icon.getName()).toEqual(suggestionOption1.icon);
    //    expect(await icon.getNamespace()).toEqual('plentyicons');
    //});
});
