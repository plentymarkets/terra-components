import { TerraCategoryPickerComponent } from './terra-category-picker.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('TerraCategoryPickerComponent', () =>
{
    let component:TerraCategoryPickerComponent;
    let fixture:ComponentFixture<TerraCategoryPickerComponent>;

    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
            imports:      [LocalizationModule.forRoot({})],
            declarations: [TerraCategoryPickerComponent],
            schemas:      [NO_ERRORS_SCHEMA]
        }).createComponent(TerraCategoryPickerComponent);

        component = fixture.componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialise its public variables', () =>
    {
        expect(component._categoryName).toBe('');
        expect(component._isContainerCategorySelected).toBe(false);
    });
});
