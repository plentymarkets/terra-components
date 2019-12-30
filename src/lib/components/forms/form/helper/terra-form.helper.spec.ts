import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormHelper } from './terra-form.helper';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
import Spy = jasmine.Spy;

describe(`TerraFormHelper:`, () =>
{
    const control1:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: 'one'
    };
    const control2:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: 'two'
    };
    const controlWithArray:TerraFormFieldInterface = {
        type:         'checkboxGroup',
        defaultValue: [1, 2]
    };
    const controlWithChildren:TerraFormFieldInterface = {
        type:     'horizontal',
        children: {
            child1: control1,
            child2: controlWithArray
        }
    };
    const controlListWithChildren:TerraFormFieldInterface = {
        type:         'horizontal',
        children:     {
            child1: control1,
            child2: controlWithArray
        },
        isList:       '[2,]'
    };
    const min:number = 3;
    const max:number = 5;
    const controlListWithRange:TerraFormFieldInterface = {
        type:   'text',
        isList: `[${min},${max}]`
    };

    describe(`#generateValidators()`, () =>
    {
        it('should return empty array if #formField is undefined', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(undefined);

            expect(validators.length).toBe(0);
        });

        it('should return empty array if #formField does not have options', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators({type:'text'});

            expect(validators.length).toBe(0);
        });

        it('should return a required validator if required is set in the options', () =>
        {
            const formField:TerraFormFieldInterface = {type: 'text', options:{required:true}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);

            expect(validators).toContain(Validators.required);
        });

        it('should return an email validator if email is in the options', () =>
        {
            const formField:TerraFormFieldInterface = {type: 'text', options:{email:true}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);

            expect(validators).toContain(Validators.email);
        });

        it('should return a minLength validator with value 2 because it is set in the options', () =>
        {
            const minLength:number = 2;
            const formField:TerraFormFieldInterface = {type: 'text', options:{minLength:minLength}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('0');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('minlength');
        });

        it('should return a maxLength validator with value 10 because it is set in the options', () =>
        {
            const maxLength:number = 10;
            const formField:TerraFormFieldInterface = {type: 'text', options:{maxLength:maxLength}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('01234567890');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('maxlength');
        });

        it('should return an error and a false validation because the minValue is 3', () =>
        {
            const minValue:number = 3;
            const formField:TerraFormFieldInterface = {type: 'number', options:{minValue:minValue}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);
            const control:FormControl = new FormControl('', validators);

            control.patchValue(0);

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('min');
        });

        it('should return an error and a false validation because the maxValue is 10', () =>
        {
            const maxValue:number = 10;
            const formField:TerraFormFieldInterface = {type: 'number', options:{maxValue:maxValue}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);
            const control:FormControl = new FormControl('', validators);

            control.patchValue(5555);

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('max');
        });

        it('should return a pattern Validator that reports an error when a entered value does not match a certain pattern', () =>
        {
            const formField:TerraFormFieldInterface = {type: 'text', options: {pattern:'[a-zA-Z]'}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('äöü12345678');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('pattern');
        });

        it('should return an iban validator that checks whether the value is a valid iban', () =>
        {
            const formField:TerraFormFieldInterface = {type: 'text', options:{iban:true}};
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(formField);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('This is not an iban');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('iban');
        });
    });


    describe(`parseReactiveForm() `, () =>
    {
        it('should return an empty FormGroup instance when _formFields is undefined', () =>
        {
            let form:any = TerraFormHelper.parseReactiveForm(undefined);

            expect(form instanceof FormGroup).toBeTruthy();
        });

        it('should return an empty FormGroup instance when _formFields is an empty Object', () =>
        {
            let form:any = TerraFormHelper.parseReactiveForm({});

            expect(form instanceof FormGroup).toBeTruthy();
        });

        it('should return a FormGroup instance with n FormControls when n primitive type _formFields are given', () =>
        {
            const formFields:{ [key:string]:TerraFormFieldInterface } = {
                formField1: control1,
                formField2: control2
            };

            let formGroup:FormGroup = TerraFormHelper.parseReactiveForm(formFields);

            expect(Object.keys(formGroup.controls).length).toBe(2);
        });

        it('should return a nested FormGroup with children as FormControls when a container with children is given', () =>
        {
            let formGroup:FormGroup = TerraFormHelper.parseReactiveForm({containerWithChildren: controlWithChildren});
            const containerWithChildren:AbstractControl = formGroup.get('containerWithChildren');

            expect(Object.keys(containerWithChildren instanceof FormGroup)).toBeTruthy();
            expect(Object.keys((containerWithChildren as FormGroup).controls).length).toBe(2);
        });

        it('should return a FormGroup including a nested FormArray with a minimum of controls given by the #isList property', () =>
        {
            let formGroup:FormGroup = TerraFormHelper.parseReactiveForm({list: controlListWithRange});
            const list:AbstractControl = formGroup.get('list');

            expect(list instanceof FormArray).toBeTruthy();
            expect((list as FormArray).length).toEqual(min);
            expect((list as FormArray).controls.every((control:AbstractControl) => control instanceof FormControl)).toBe(true);
        });

        it('should return a FormGroup including nested FormArray with FormGroup children when a list with children is given', () =>
        {
            let formGroup:FormGroup = TerraFormHelper.parseReactiveForm({listWithChildren: controlListWithChildren});
            const listWithChildren:AbstractControl = formGroup.get('listWithChildren');

            expect(listWithChildren instanceof FormArray).toBeTruthy();
            expect((listWithChildren as FormArray).length).toEqual(2);
            expect((listWithChildren as FormArray).controls.every((control:AbstractControl) => control instanceof FormGroup)).toBe(true);
        });

        describe(`createNewControl()`, () =>
        {
            it(`should create a new FormControl instance for a primitive #formField type`, () =>
            {
                const control:AbstractControl = TerraFormHelper.createNewControl(null, control1);
                expect(control instanceof FormControl).toBe(true);
            });

            it(`should add validators to the control`, () =>
            {
                const spy:Spy = spyOn(TerraFormHelper, 'generateValidators').and.callThrough();
                const formField:TerraFormFieldInterface = control1;
                formField.options = {
                    required: true
                };
                const control:FormControl = TerraFormHelper.createNewControl(null, formField) as FormControl;
                expect(control.validator).not.toBeNull();
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith(formField);
            });

            it(`should create a new FormGroup instance if a #formField has children`, () =>
            {
                const spy:Spy = spyOn(TerraFormHelper, 'parseReactiveForm').and.callThrough();
                const formField:TerraFormFieldInterface = controlWithChildren;
                const control:AbstractControl = TerraFormHelper.createNewControl(null, formField);
                expect(control instanceof FormGroup).toBe(true);
                expect(Object.values((control as FormGroup).controls).length).toBe(Object.values(formField.children).length);
                expect(spy).toHaveBeenCalledWith(formField.children, null);
            });

            it(`should set the new control's value to the passed #value`, () =>
            {
                const value:string = 'value';
                const control:FormControl = TerraFormHelper.createNewControl(value, control1) as FormControl;
                expect(control.value).toEqual(value);

                const objectValue:Object = {
                    child1: 'bla',
                    child2: [3, 4, 5]
                };
                const group:FormGroup = TerraFormHelper.createNewControl(objectValue, controlWithChildren) as FormGroup;
                expect(group.value).toEqual(objectValue);
            });
        });

        describe(`_fitControlsToRange()`, () =>
        {
            it(`should add controls to the given list of #controls until the minimum of the range is reached`, () =>
            {
                const controls:Array<AbstractControl> = [];
                TerraFormHelper['_fitControlsToRange'](controlListWithRange, controls);
                expect(controls.length).toBe(min);
            });

            it(`should remove controls to the given list of #controls if it exceeds the maximum of the range`, () =>
            {
                const controls:Array<AbstractControl> = Array(max + 1).fill(new FormControl());
                TerraFormHelper['_fitControlsToRange'](controlListWithRange, controls);
                expect(controls.length).toBe(max);
            });

            it(`should not change anything on the list of #controls if its length is in the given range`, () =>
            {
                const count:number = min + 1;
                const controls:Array<AbstractControl> = Array(count).fill(new FormControl());
                const controlsCopy:Array<AbstractControl> = controls.slice();
                TerraFormHelper['_fitControlsToRange'](controlListWithRange, controls);
                expect(controls.length).toBe(count);
                expect(controls).toEqual(controlsCopy);
            });
        });

        describe('sanitiseWidth()', () =>
        {
            it(`should remove illegal classes from width parameter`, () =>
            {
                expect(TerraFormHelper.sanitiseWidth(undefined)).toBe(undefined);
                expect(TerraFormHelper.sanitiseWidth('col-lg-12')).toBe('col-lg-12');
                expect(TerraFormHelper.sanitiseWidth('coeeeel-lg-12')).toBe('');
                expect(TerraFormHelper.sanitiseWidth('col-lg-H')).toBe('');
                expect(TerraFormHelper.sanitiseWidth('col-lg')).toBe('');
                expect(TerraFormHelper.sanitiseWidth('col-lg-13')).toBe('');
                expect(TerraFormHelper.sanitiseWidth('col-lg-2 col-xs-12')).toBe('col-lg-2 col-xs-12');
                expect(TerraFormHelper.sanitiseWidth('col-lg-2 col-xs-1300')).toBe('col-lg-2');
            });
        });

    });
});
