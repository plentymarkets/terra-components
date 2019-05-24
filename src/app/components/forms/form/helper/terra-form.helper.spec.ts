import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormHelper } from './terra-form.helper';
import {
    AbstractControl,
    ValidatorFn,
    Validators,
    FormArray,
    FormControl,
    FormGroup
} from '@angular/forms';
import Spy = jasmine.Spy;
import { listWithChildren } from '../example/form-fields';

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
        defaultValue: [1,
                       2]
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
        isList:       '[1,]',
        defaultValue: 5
    };
    const min:number = 3;
    const max:number = 5;
    const controlListWithRange:TerraFormFieldInterface = {
        type:   'text',
        isList: `[${min},${max}]`
    };
    const child1:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: 'one',
        options:      {
            required:  true,
            email:     true,
            minLength: 3,
            maxLength: 10,
            minValue:  3,
            maxValue:  10,
            pattern:   '[a-zA-Z ]',
            iban:      true
        }
    };
    const child3:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: '',
        options:      {
            required: true,
            isIban:   true
        }
    };
    const child2:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: [1,
                       2]
    };

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
                child2: [3,
                         4,
                         5]
            };
            const group:FormGroup = TerraFormHelper.createNewControl(objectValue, controlWithChildren) as FormGroup;
            expect(group.value).toEqual(objectValue);
        });
    });

    describe(`fitControlsToRange()`, () =>
    {
        it(`should add controls to the given list of #controls until the minimum of the range is reached`, () =>
        {
            const controls:Array<AbstractControl> = [];
            TerraFormHelper['fitControlsToRange'](controlListWithRange, controls);
            expect(controls.length).toBe(min);
        });

        it(`should remove controls to the given list of #controls if it exceeds the maximum of the range`, () =>
        {
            const controls:Array<AbstractControl> = Array(max + 1).fill(new FormControl());
            TerraFormHelper['fitControlsToRange'](controlListWithRange, controls);
            expect(controls.length).toBe(max);
        });

        it(`should not change anything on the list of #controls if its length is in the given range`, () =>
        {
            const count:number = min + 1;
            const controls:Array<AbstractControl> = Array(count).fill(new FormControl());
            const controlsCopy:Array<AbstractControl> = controls.slice();
            TerraFormHelper['fitControlsToRange'](controlListWithRange, controls);
            expect(controls.length).toBe(count);
            expect(controls).toEqual(controlsCopy);
        });
    });


    describe(`#generateValidators()`, () =>
    {
        it('should return empty array if formFields do not have options', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child2);

            expect(validators.length).toBe(0);
        });

        it('should return empty array if formFields is undefined', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(undefined);

            expect(validators.length).toBe(0);
        });

        it('should return a required validator if required is set in the options', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);

            expect(validators).toContain(Validators.required);
        });

        it('should return an email validator if email is in the options', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);

            expect(validators.indexOf(Validators.email)).not.toBe(-1);
        });

        it('should return a minLength validator with value 1 because it is set in the options', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('0');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('minlength');
        });

        it('should return a maxLength validator with value 10 because it is set in the options', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('01234567890');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('maxlength');
        });

        it('should return an error and a false validation because the minValue is 3', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);
            const control:FormControl = new FormControl('', validators);

            control.patchValue(0);

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('min');
        });

        it('should return an error and a false validation because the minValue is 10', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);
            const control:FormControl = new FormControl('', validators);

            control.patchValue(5555);

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('max');
        });

        it('should return false if the entered form is not a pattern and should have an error in the form for patterns', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child1);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('äöü12345678');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('pattern');
        });

        it('should return false if the entered value is not an iban', () =>
        {
            const validators:Array<ValidatorFn> = TerraFormHelper.generateValidators(child3);
            const control:FormControl = new FormControl('', validators);

            control.patchValue('This is not an iban');

            expect(control.valid).toBe(false);
            expect(Object.keys(control.errors)).toContain('iban');
        });
    });


    describe(`parseReactiveForm() `, () =>
    {
        it('return empty formgroup instance formfields is not an object', () =>
        {
            let value:any = TerraFormHelper.parseReactiveForm('');

            expect(value instanceof FormGroup).toBeTruthy();
        });

        it('return empty formgroup instance formfields is undefined', () =>
        {
            let value:any = TerraFormHelper.parseReactiveForm(undefined);

            expect(value instanceof FormGroup).toBeTruthy();
        });

        it('return empty formGroup instance when formFields is emptyObject', () =>
        {
            let value:any = TerraFormHelper.parseReactiveForm({});

            expect(value instanceof FormGroup).toBeTruthy();
        });

        it('return formgroup of n formcontrols when given primitive type formfields', () =>
        {
            const formFields:{ [key:string]:TerraFormFieldInterface } = {
                formField1: control1,
                formField2: control2
            };

            let value:FormGroup = TerraFormHelper.parseReactiveForm(formFields);

            expect(Object.keys(value.controls).length).toBe(2);
        });

        it('return nested formgroup with children as formcontrols when given container with children', () =>
        {
            let value:FormGroup = TerraFormHelper.parseReactiveForm({containerwithChildren: controlWithChildren});

            expect(Object.keys(value.controls['containerwithChildren'] instanceof FormGroup)).toBeTruthy();
            expect(Object.keys(value.controls['containerwithChildren'].controls).length).toBe(2);
        });

        it('return formgroup with n controls when given list with n controls', () =>
        {
            let value:FormGroup = TerraFormHelper.parseReactiveForm({list: listWithChildren});

            expect(Object.keys(value.controls).length).toBe(1);
        });

        it('return formgroup including nested formarray with formgroup children when given list with children', () =>
        {
            let value:FormGroup = TerraFormHelper.parseReactiveForm({listWithChildren: controlListWithChildren});

            console.log(value.controls['listWithChildren']);
            expect(value.controls['listWithChildren'] instanceof FormArray).toBeTruthy();
            expect((value.controls['listWithChildren'].controls).length).toEqual(1);
        });
    });
});
