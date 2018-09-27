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
import { TerraTextInputComponent } from '../../../..';

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
        // component.inputListBoxValues = [];

        fixture.detectChanges(false);
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    // it('should toggle open', () =>
    // {
    //     component.toggleOpen = true;
    //
    //     expect(component.toggleOpen).toBe(true);
    // });
});
