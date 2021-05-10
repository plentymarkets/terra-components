import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionComponent } from './suggestion.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { By } from '@angular/platform-browser';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { MatInputHarness } from '@angular/material/input/testing';

// tslint:disable-next-line:max-function-line-count
describe('SuggestionComponent', () => {
    let component: SuggestionComponent;
    let fixture: ComponentFixture<SuggestionComponent>;
    let loader: HarnessLoader;
    let autoComplete: MatAutocompleteHarness;
    let input: MatInputHarness;

    const suggestionOption1: TerraSuggestionBoxValueInterface = {
        caption: 'Apple',
        value: 1
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
            imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule, FormsModule, MatAutocompleteModule],
            declarations: [SuggestionComponent, MockTooltipDirective]
        });

        fixture = TestBed.createComponent(SuggestionComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);
        autoComplete = await loader.getHarness(MatAutocompleteHarness);
        input = await loader.getHarness(MatInputHarness);

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
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();

        expect(await input.isRequired()).toBe(true);
    });

    it('should disable the input when #isDisabled is set', async () => {
        expect(await autoComplete.isDisabled()).toBe(false);
        expect(await input.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();

        expect(await autoComplete.isDisabled()).toBe(true);
        expect(await input.isDisabled()).toBe(true);
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
        expect(await autoComplete.getValue()).toEqual(suggestionOption1.value.toString());
        expect(await input.getValue()).toEqual(suggestionOption1.value.toString());
    });

    it('should call registered change callback whenever the value of the input is changed by the user', async () => {
        const onChangeCallback: jasmine.Spy = jasmine.createSpy('onChange');
        component.registerOnChange(onChangeCallback);

        await input.setValue(suggestionOption1.caption);

        expect(onChangeCallback).toHaveBeenCalledWith(suggestionOption1.caption);
    });

    it('should call registered touched callback whenever the input was blurred', async () => {
        const onTouchedCallback: jasmine.Spy = jasmine.createSpy('onTouched');
        component.registerOnTouched(onTouchedCallback);

        await autoComplete.blur();

        expect(onTouchedCallback).toHaveBeenCalled();
    });
});
