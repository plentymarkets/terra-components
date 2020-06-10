import {
    DebugElement,
    ElementRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../app/translation/l10n.config';
import { TerraSuggestionBoxComponent } from './terra-suggestion-box.component';

import { MockElementRef } from '../../../testing/mock-element-ref';
import { By } from '@angular/platform-browser';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { TerraSuggestionBoxValueInterface } from './data/terra-suggestion-box.interface';
import { TerraTextInputComponent } from '../input/text-input/terra-text-input.component';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { mockRouterProvider } from '../../../testing/mock-router';
import Spy = jasmine.Spy;

describe('TerraSuggestionBoxComponent', () =>
{
    let component:TerraSuggestionBoxComponent;
    let fixture:ComponentFixture<TerraSuggestionBoxComponent>;
    const suggestion:TerraSuggestionBoxValueInterface = {
        caption: '1',
        value:   1
    };

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective,
                           TerraSuggestionBoxComponent,
                           TerraTextInputComponent,
                           TerraLabelTooltipDirective
            ],
            imports:      [
                FormsModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                mockRouterProvider,
                {
                    provide:  ElementRef,
                    useClass: MockElementRef
                }
            ]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraSuggestionBoxComponent);
        component = fixture.componentInstance;

        component.inputListBoxValues = []; // this also resets the selectedValue to null
        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should toggle open', () =>
    {
        component.toggleOpen = true;

        expect(component.toggleOpen).toBe(true);

        component.toggleOpen = false;

        expect(component.toggleOpen).toBe(false);
    });

    it('Clicking on the .select-box-wrapper toggles the dropdown', () =>
    {
        component.toggleOpen = false; // close the dropdown

        let debugElement:DebugElement = fixture.debugElement;
        let selectBoxWrapperDe:DebugElement = debugElement.query(By.css('.select-box-wrapper'));

        selectBoxWrapperDe.triggerEventHandler('click', new Event('click'));

        expect(component.toggleOpen).toEqual(true);

        selectBoxWrapperDe.triggerEventHandler('click', new Event('click'));

        expect(component.toggleOpen).toEqual(false);
    });

    it('`selectedValue` and `value` to be initialised with `null`', () =>
    {
        expect(component.selectedValue).toEqual(null);
        expect(component.value).toEqual(null);
    });

    it('should update `value` and `selectedValue` if the `value` is set to a value that is included in `inputListBoxValues`', () =>
    {
        component.inputListBoxValues = [suggestion];
        component.value = suggestion.value;

        // check expectations after setting the value
        expect(component.value).toEqual(suggestion.value);
        expect(component.selectedValue).toEqual(suggestion);
    });

    it('should set `selectedValue` to `null` if the `value` is set to a `value` that is not included in `inputListBoxValues`', () =>
    {
        component.inputListBoxValues = [suggestion];
        component.value = 2;

        // check expectations after setting the value
        expect(component.value).toEqual(null); // TODO: Don't we expect the value to be the value that we have just set here?
        expect(component.selectedValue).toEqual(null);
    });

    it('set #selectedValue should update #value and the displayed text in the input', () =>
    {
        let suggestionBoxElement:HTMLElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = suggestionBoxElement.querySelector('input');
        component.inputListBoxValues = [suggestion];
        component.selectedValue = suggestion;

        fixture.detectChanges();

        expect(component.selectedValue).toEqual(suggestion);
        expect(component.value).toEqual(suggestion.value);
        // expect(inputElement.value).toEqual(suggestion.caption); // TODO: The value is not updated..
    });

    it('#_onChange() should open the dropdown (set #_toggleOpen to "true")', () =>
    {
        component.toggleOpen = true;
        component._onChange();
        expect(component.toggleOpen).toEqual(true);


        component.toggleOpen = false;
        expect(component.toggleOpen).toEqual(false);
        component._onChange();

        expect(component.toggleOpen).toEqual(true);
    });

    it('Entering text should call #_onChange() and update #selectedValue and #value', () =>
    {
        component.inputListBoxValues = [suggestion];
        let spy:Spy = spyOn(component, '_onChange').and.callThrough();

        let terraTextInput:TerraTextInputComponent = fixture.debugElement.query(By.css('terra-text-input')).componentInstance;

        // simulate user entering a new value into the input box
        // a value that is included in the suggestions
        terraTextInput.value = suggestion.caption as string;
        terraTextInput.outputOnInput.emit();

        expect(component.selectedValue).toEqual(suggestion);
        expect(component.value).toEqual(suggestion.value);

        // empty input
        terraTextInput.value = '';
        terraTextInput.outputOnInput.emit();

        expect(component.selectedValue).toEqual(undefined);
        expect(component.value).toEqual(null);

        // input that is not included in the suggestions
        terraTextInput.value = '123';
        terraTextInput.outputOnInput.emit();

        expect(component.selectedValue).toEqual(undefined);
        expect(component.value).toEqual(null);

        // check if the _onChange()-Method has been called every time the text has changed
        expect(spy).toHaveBeenCalledTimes(3);
    });


    it('should auto-select a suggestion if the entered text matches the caption of the suggestion', () =>
    {
        component.inputListBoxValues = [suggestion];
        let suggestionBoxElement:HTMLElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = suggestionBoxElement.querySelector('input');

        expect(component.selectedValue).toBeNull(); // TODO: unify.. selectedValue should be undefined or set to a specific value, not null

        inputElement.value = suggestion.caption as string;
        inputElement.dispatchEvent(new Event('input'));

        expect(component.selectedValue).toEqual(suggestion);

        inputElement.value = 'hasdh';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.selectedValue).toBeUndefined();

    });

    it('#textValueChanged should emit if a text has been entered', () =>
    {
        let suggestionBoxElement:HTMLElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = suggestionBoxElement.querySelector('input');

        const enteredText:string = '123';
        let text:string = '';
        component.textInputValueChange.subscribe((eventText:string) => text = eventText);

        inputElement.value = enteredText;
        inputElement.dispatchEvent(new Event('input'));

        expect(text).toEqual(enteredText);
    });
});
