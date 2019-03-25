import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFormComponent } from './terra-form.component';
import { TerraFormContainerComponent } from './form-container/terra-form-container.component';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { TerraFormEntryListComponent } from './form-entry-list/terra-form-entry-list.component';
import { TooltipModule } from 'ngx-bootstrap';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { TerraFormEntryComponent } from './form-entry/terra-form-entry.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import { TerraControlTypeEnum } from '../dynamic-form/enum/terra-control-type.enum';
import { MockFormFieldBaseOptions } from '../../../testing/mock-form-field-base-options';
import { MockFormFieldBase } from '../../../testing/mock-form-field-base';
import { TerraFormFieldInterface } from './model/terra-form-field.interface';
import Spy = jasmine.Spy;

fdescribe(`TerraCardComponent:`, () =>
{
    let component:TerraFormComponent;
    let fixture:ComponentFixture<TerraFormComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraLabelTooltipDirective,
                           TerraButtonComponent,
                           TerraFormEntryListComponent,
                           TerraFormEntryComponent,
                           TerraFormContainerComponent,
                           TerraFormComponent],
            imports:      [TooltipModule.forRoot(),
                           FormsModule,
                           ReactiveFormsModule,
                           LocalizationModule.forRoot(l10nConfig)]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        expect(component.inputIsDisabled).toBe(false);
        expect(component.inputFormFields).toEqual({});
    });

    it('writingValues should patchValues in formGroup, change scope-data and leave formGroup untouched', () =>
    {
        let spyPatchValue:Spy = spyOn(component.formGroup, 'patchValue').and.callThrough();
        let spyMarkAsUntouched:Spy = spyOn(component.formGroup, 'markAsUntouched').and.callThrough();

        let mockValues:any = {
            control1: 'one',
            control2: 'two'
        };

        let formFields:{ [key:string]:TerraFormFieldInterface } = {
            control1:{type:'inputText'},
            control2:{type:'inputText'}
        };

        component.inputFormFields = formFields;

        component.writeValue(mockValues);

        expect(spyPatchValue).toHaveBeenCalledWith(mockValues);

        expect(component.scope.data).toEqual(mockValues);

        component.writeValue(null);

        expect(spyMarkAsUntouched).toHaveBeenCalled();
        expect(component.formGroup.untouched).toEqual(true);
    });

    it('should call callback on change', () =>
    {
        let spy = jasmine.createSpy('spy');

        component.registerOnChange(spy);

        let legacyFormFieldOptions = new MockFormFieldBaseOptions();

        let legacyFormField = new MockFormFieldBase('test', TerraControlTypeEnum.INPUT_TEXT, '', true, legacyFormFieldOptions);

        component.inputFormFields = [legacyFormField];

        component.formGroup.addControl('control1', new FormControl());

        let mockValues:any = {
            control1: 'one'
        };

        component.formGroup.patchValue(mockValues);

        expect(spy).toHaveBeenCalled();
    });

    it('should transform legacy formfields', () =>
    {
        let legacyFormFieldOptions = new MockFormFieldBaseOptions();

        let legacyFormField = new MockFormFieldBase('test', TerraControlTypeEnum.INPUT_TEXT, '', true, legacyFormFieldOptions);

        component.inputFormFields = [legacyFormField];

        expect(component.inputFormFields['test']).toBeDefined();
    });
});
