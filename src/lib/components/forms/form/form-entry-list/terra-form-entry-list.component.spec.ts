import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { L10nTranslationModule } from 'angular-l10n';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TerraFormEntryListComponent } from './terra-form-entry-list.component';
import { TerraFormContainerComponent } from '../form-container/terra-form-container.component';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

@Component({
    template: `
        <terra-form-entry-list
            [inputFormGroup]="formGroup"
            [inputFormFieldKey]="formFieldKey"
            [inputFormField]="formField"
            [inputScope]="scope"
            [inputControlTypeMap]="{}"
            [width]="width"
            [containerTemplate]="listContainerTemplate"
        >
        </terra-form-entry-list>

        <ng-template
            #listContainerTemplate
            let-formField
            let-control="control"
            let-width="width"
            let-disabled="disabled"
            let-controlTypeMap="controlTypeMap"
            let-scope="scope"
        >
            <terra-form-container
                [formGroup]="control"
                [inputFormGroup]="control"
                [inputFormFields]="formField.children"
                [inputScope]="scope"
                [inputControlTypeMap]="controlTypeMap"
                [inputIsDisabled]="disabled"
                [width]="width"
                [horizontal]="formField.type === 'horizontal'"
            ></terra-form-container>
        </ng-template>
    `
})
class HostComponent {
    public formFieldKey: string = 'listTest';
    public formField: TerraFormFieldInterface = {
        type: 'horizontal',
        children: {
            test: {
                type: 'number'
            }
        }
    };
    public formGroup: FormGroup = new FormGroup({
        [this.formFieldKey]: new FormArray([
            new FormGroup({
                test: new FormControl('')
            })
        ])
    });
    public scope: TerraFormScope = new TerraFormScope();
    public width: string;
}

fdescribe('TerraFormEntryListComponent: ', () => {
    let fixture: ComponentFixture<HostComponent>;
    let hostComponent: HostComponent;
    let formEntryListComponent: TerraFormEntryListComponent;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            declarations: [HostComponent, TerraFormEntryListComponent, TerraFormContainerComponent]
        }).createComponent(HostComponent);

        fixture.detectChanges();

        hostComponent = fixture.componentInstance;
        formEntryListComponent = fixture.debugElement.query(By.directive(TerraFormEntryListComponent))
            .componentInstance;
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
        expect(formEntryListComponent).toBeTruthy();
    });

    it(`should pass on the value of its #width property to the #TerraFormContainer's #width input`, () => {
        const width: string = 'col-5';
        formEntryListComponent.width = width;

        formEntryListComponent.ngOnChanges({
            inputFormFieldKey: new SimpleChange(undefined, formEntryListComponent.inputFormFieldKey, false)
        });
        fixture.detectChanges();

        const formContainer: TerraFormContainerComponent = fixture.debugElement.query(
            By.directive(TerraFormContainerComponent)
        ).componentInstance;
        expect(formContainer).toBeTruthy();
        expect(formContainer.width).toBe(width);
    });
});
