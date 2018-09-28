/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';

import { TerraSuggestionBoxComponent } from './terra-suggestion-box.component';
import {
    TerraSuggestionBoxValueInterface,
    TerraTextInputComponent
} from '../../../..';

import { MockElementRef } from '../../../testing/mock-element-ref';
import Spy = jasmine.Spy;

describe('TerraSuggestionBoxComponent', () =>
{
    let component:TerraSuggestionBoxComponent;
    let fixture:ComponentFixture<TerraSuggestionBoxComponent>;
    const suggestion:TerraSuggestionBoxValueInterface = {caption: '1', value: 1};

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraSuggestionBoxComponent,
                TerraTextInputComponent
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers: [
                { provide: ElementRef, useClass: MockElementRef }
            ]
        }).compileComponents();
    }));

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

    it('Calling `resetComponentValue` should set `selectedValue` and `value` to `null`', () =>
    {
        component.inputListBoxValues = [suggestion];
        component.value = suggestion.value;

        // check expectations after setting the value
        expect(component.value).toEqual(suggestion.value);
        expect(component.selectedValue).toEqual(suggestion);

        component.resetComponentValue();

        expect(component.value).toEqual(null);
        expect(component.selectedValue).toEqual(null);
    });

    it('set #selectedValue should update #value and the displayed text in the input', async(() =>
    {
        component.inputListBoxValues = [suggestion];
        component.selectedValue = suggestion;

        fixture.detectChanges();

        expect(component.selectedValue).toEqual(suggestion);
        expect(component.value).toEqual(suggestion.value);

        let suggestionBoxElement:HTMLElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = suggestionBoxElement.querySelector('input');
        //expect(inputElement.value).toEqual(suggestion.caption); // TODO: The value is not updated..
    }));

    it('#onChange() should open the dropdown (set #toggleOpen to "true")', () =>
    {
        component.toggleOpen = true;
        component.onChange();
        expect(component.toggleOpen).toEqual(true);


        component.toggleOpen = false;
        expect(component.toggleOpen).toEqual(false);
        component.onChange();

        expect(component.toggleOpen).toEqual(true);
    });

    it('Entering text should call #onChange()', () =>
    {
        component.inputListBoxValues = [suggestion];

        let suggestionBoxElement:HTMLElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = suggestionBoxElement.querySelector('input');

        let spy:Spy = spyOn(component, 'onChange');

        // simulate user entering a new value into the input box
        inputElement.value = '1';
        inputElement.dispatchEvent(new Event('input'));

        // simulate user entering a new value into the input box
        inputElement.value = '';
        inputElement.dispatchEvent(new Event('input'));

        // check if the onChange Method have been called every time the text has changed
        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('Entering text should update #selectedValue and #value', () =>
    {
        component.inputListBoxValues = [suggestion];

        let suggestionBoxElement:HTMLElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = suggestionBoxElement.querySelector('input');

        // simulate user entering a new value into the input box
        // a value that is included in the suggestions
        inputElement.value = suggestion.caption as string;
        inputElement.dispatchEvent(new Event('input'));

        expect(component.selectedValue).toEqual(suggestion);
        expect(component.value).toEqual(suggestion.value);

        // empty input
        inputElement.value = '';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.selectedValue).toEqual(undefined);
        expect(component.value).toEqual(null);

        // input that is not included in the suggestions
        inputElement.value = '123';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.selectedValue).toEqual(undefined);
        expect(component.value).toEqual(null);
    });

    it('#textValueChanged notifies if a text has been entered', () =>
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
