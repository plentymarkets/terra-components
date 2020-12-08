import { TerraCategoryPickerComponent } from './terra-category-picker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockL10nConfig } from '../../../testing/mock-l10n-config';

describe('TerraCategoryPickerComponent', () => {
    let component: TerraCategoryPickerComponent;
    let fixture: ComponentFixture<TerraCategoryPickerComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            declarations: [TerraCategoryPickerComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TerraCategoryPickerComponent);

        component = fixture.componentInstance;
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should initialise its public variables', () => {
        expect(component._categoryName).toBe('');
        expect(component._isContainerCategorySelected).toBe(false);
    });
});
