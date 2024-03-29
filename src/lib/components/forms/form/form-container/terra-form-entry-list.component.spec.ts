import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { L10nTranslationModule } from 'angular-l10n';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TerraFormContainerComponent, TerraFormEntryListComponent } from './terra-form-container--entry-list.component';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';

describe('TerraFormEntryListComponent: ', () => {
    let fixture: ComponentFixture<TerraFormEntryListComponent>;
    let component: TerraFormEntryListComponent;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            declarations: [TerraFormEntryListComponent, TerraFormContainerComponent]
        }).createComponent(TerraFormEntryListComponent);

        component = fixture.componentInstance;
    });

    beforeEach(() => {
        component.inputScope = new TerraFormScope();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should pass on the value of its #width property to the #TerraFormContainer's #width input`, () => {
        const width: string = 'col-5';
        component.width = width;
        component.inputFormFieldKey = 'listTest';
        component.inputFormField = {
            type: 'horizontal',
            children: {
                test: {
                    type: 'number'
                }
            }
        };
        component.inputFormGroup = new FormGroup({
            listTest: new FormArray([
                new FormGroup({
                    test: new FormControl('')
                })
            ])
        });

        component.ngOnChanges({ inputFormFieldKey: new SimpleChange(undefined, component.inputFormFieldKey, false) });
        fixture.detectChanges();

        const formContainer: TerraFormContainerComponent = fixture.debugElement.query(
            By.directive(TerraFormContainerComponent)
        ).componentInstance;
        expect(formContainer).toBeTruthy();
        expect(formContainer.width).toBe(width);
    });
});
