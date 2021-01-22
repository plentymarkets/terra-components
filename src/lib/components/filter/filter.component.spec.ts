import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import { mockL10nConfig } from '../../testing/mock-l10n-config';

describe('FilterComponent:', () => {
    let filterComponent: FilterComponent;
    let fixture: ComponentFixture<FilterComponent>;
    let buttons: Array<DebugElement>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TerraButtonComponent, FilterComponent],
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterComponent);
        filterComponent = fixture.componentInstance;
        buttons = fixture.debugElement.queryAll(By.directive(TerraButtonComponent));

        fixture.detectChanges();
    });

    it(`should create`, () => {
        expect(filterComponent).toBeTruthy();
    });

    it(`should initialize correctly`, () => {
        expect(filterComponent.reset).toBeDefined();
        expect(filterComponent.search).toBeDefined();
    });

    it(`should emit on #search if search button is clicked`, () => {
        spyOn(filterComponent.search, 'emit');

        buttons[0].componentInstance.outputClicked.emit();

        expect(filterComponent.search.emit).toHaveBeenCalled();
    });

    it(`should emit on #reset if reset button is clicked`, () => {
        spyOn(filterComponent.reset, 'emit');

        buttons[1].componentInstance.outputClicked.emit();

        expect(filterComponent.reset.emit).toHaveBeenCalled();
    });
});
