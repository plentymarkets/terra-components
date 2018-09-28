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

describe('TerraSuggestionBoxComponent', () =>
{
    let component:TerraSuggestionBoxComponent;
    let fixture:ComponentFixture<TerraSuggestionBoxComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraSuggestionBoxComponent,
                TerraTextInputComponent
            ],
            imports: [
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

        component.inputListBoxValues = [];
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
        const suggestion:TerraSuggestionBoxValueInterface = {caption: '1', value: 1};
        component.inputListBoxValues = [suggestion];
        component.value = suggestion.value;

        // check expectations after setting the value
        expect(component.value).toEqual(suggestion.value);
        expect(component.selectedValue).toEqual(suggestion);
    });

    it('should set `selectedValue` to `null` if the `value` is set to a `value` that is not included in `inputListBoxValues`', () =>
    {
        const suggestion:TerraSuggestionBoxValueInterface = {caption: '1', value: 1};
        component.inputListBoxValues = [suggestion];
        component.value = 2;

        // check expectations after setting the value
        expect(component.value).toEqual(null); // TODO: Don't we expect the value to be the value that we have just set here?
        expect(component.selectedValue).toEqual(null);
    });

    it('Calling `resetComponentValue` should set `selectedValue` and `value` to `null`', () =>
    {
        const suggestion:TerraSuggestionBoxValueInterface = {caption: '1', value: 1};
        component.inputListBoxValues = [suggestion];
        component.value = suggestion.value;

        // check expectations after setting the value
        expect(component.value).toEqual(suggestion.value);
        expect(component.selectedValue).toEqual(suggestion);

        component.resetComponentValue();

        expect(component.value).toEqual(null);
        expect(component.selectedValue).toEqual(null);
    });

    it('Calling `onChange` should open the dropdown (set toggleOpen to `true`)', () =>
    {
        component.toggleOpen = true;
        component.onChange();
        expect(component.toggleOpen).toEqual(true);


        component.toggleOpen = false;
        expect(component.toggleOpen).toEqual(false);
        component.onChange();

        expect(component.toggleOpen).toEqual(true);
    });
});
