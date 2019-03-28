import { TerraFormComponent } from './terra-form.component';
import { FormControl } from '@angular/forms';
import { TerraControlTypeEnum } from '../dynamic-form/enum/terra-control-type.enum';
import { TerraFormFieldInterface } from './model/terra-form-field.interface';
import Spy = jasmine.Spy;
import { TerraFormFieldBase } from '../dynamic-form/data/terra-form-field-base';

fdescribe(`TerraCardComponent:`, () =>
{
    let component:TerraFormComponent;


    beforeEach(() =>
    {
        component = new TerraFormComponent();
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
        let mockValues:any = {
            control1: 'one',
            control2: 'two'
        };

        let formFields:{ [key:string]:TerraFormFieldInterface } = {
            control1:{type:'text'},
            control2:{type:'text'}
        };

        component.inputFormFields = formFields;

        let spyPatchValue:Spy = spyOn(component.formGroup, 'patchValue');

        component.writeValue(mockValues);

        expect(spyPatchValue).toHaveBeenCalledWith(mockValues);

        expect(component.scope.data).toEqual(mockValues);

        component.writeValue(null);

        expect(component.formGroup.untouched).toEqual(true);
    });

    it('should call callback on change', () =>
    {
        let spy:Spy = jasmine.createSpy('spy');

        component.registerOnChange(spy);

        let legacyFormField:TerraFormFieldBase<string> = new TerraFormFieldBase<string>('test', TerraControlTypeEnum.INPUT_TEXT, '', true, {});

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
        let legacyFormField:TerraFormFieldBase<string> = new TerraFormFieldBase<string>('test', TerraControlTypeEnum.INPUT_TEXT, '', true, {});

        component.inputFormFields = [legacyFormField];

        expect(component.inputFormFields['test']).toBeDefined();
    });
});
