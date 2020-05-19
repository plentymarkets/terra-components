import {
    DebugElement,
    NO_ERRORS_SCHEMA
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TranslationModule } from 'angular-l10n';

import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import Spy = jasmine.Spy;

fdescribe('FilterComponent:', () =>
{
    let filterComponent:FilterComponent;
    let fixture:ComponentFixture<FilterComponent>;
    let buttons:Array<DebugElement>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraButtonComponent,
                FilterComponent
            ],
            imports:      [TranslationModule.forRoot({})],
            schemas:      [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(FilterComponent);
        filterComponent = fixture.componentInstance;
        buttons = fixture.debugElement.queryAll(By.css('form terra-base-toolbar div.btn-group terra-button'));

        fixture.detectChanges();
    });

    it(`should create`, () =>
    {
        expect(filterComponent).toBeTruthy();
    });

    it(`should initialize correctly`, () =>
    {
        expect(filterComponent.reset).toBeDefined();
        expect(filterComponent.search).toBeDefined();
    });

    it(`should emit on #search if search button is clicked`, () =>
    {
        let spy:Spy = jasmine.createSpy('search');

        filterComponent.search.subscribe(() =>
        {
            spy();
        });

        buttons[0].componentInstance.outputClicked.emit();

        expect(spy).toHaveBeenCalled();
    });

    it(`should emit on #reset if reset button is clicked`, () =>
    {
        let spy:Spy = jasmine.createSpy('reset');

        filterComponent.reset.subscribe(() =>
        {
            spy();
        });

        buttons[1].componentInstance.outputClicked.emit();

        expect(spy).toHaveBeenCalled();
    });
});
