import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionComponent } from './suggestion.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('SuggestionComponent', () => {
    let component: SuggestionComponent;
    let fixture: ComponentFixture<SuggestionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatAutocompleteModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule],
            declarations: [SuggestionComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SuggestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
