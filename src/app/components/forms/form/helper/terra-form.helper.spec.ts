import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormHelper } from './terra-form.helper';
import {
    AbstractControl,
    FormControl,
    FormGroup
} from '@angular/forms';
import Spy = jasmine.Spy;

describe(`TerraFormHelper:`, () =>
{
    const child1:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: 'one'
    };
    const child2:TerraFormFieldInterface = {
        type:         'text',
        defaultValue: [1, 2]
    };

    const formFields:{ [key:string]:TerraFormFieldInterface } = {
        control1: {type: 'text', defaultValue: 'one'},
        control2: {type: 'text', defaultValue: 'two'},
        controlWithArray: {type: 'text', defaultValue: [1, 2]},
        controlWithObject: {type: 'text', defaultValue: {foo: 'bar'}},
        controlWithChildren: {type: 'horizontal', children: {child1: child1, child2: child2}},
        controlList: {type: 'number', isList: true, defaultValue: 5},
        controlListWithoutDefaultValue: {type: 'number', isList: true}
    };

    it('should', () =>
    {

    });

    describe(`createNewControl()`, () =>
    {
        it(`should create a new FormControl instance for a primitive #formField type`, () =>
        {
            const control:AbstractControl = TerraFormHelper.createNewControl(null, child1);
            expect(control instanceof FormControl).toBe(true);
        });

        it(`should set the new control's value to the passed #value`, () =>
        {
            const value:string = 'value';
            const control:AbstractControl =  TerraFormHelper.createNewControl(value, child1);
            expect(control.value).toEqual(value);
        });

        it(`should add validators to the control`, () =>
        {
            const spy:Spy = spyOn(TerraFormHelper, 'generateValidators').and.callThrough();
            const formField:TerraFormFieldInterface = child1;
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
            const formField:TerraFormFieldInterface = formFields.controlWithChildren;
            const control:AbstractControl = TerraFormHelper.createNewControl(null, formField);
            expect(control instanceof FormGroup).toBe(true);
            expect(Object.values((control as FormGroup).controls).length).toBe(Object.values(formField.children).length);
            expect(spy).toHaveBeenCalledWith(formField.children, null);
        });
    });

    describe(`fitControlsToRange()`, () =>
    {
        const min:number = 3;
        const max:number = 5;
        const listFormField:TerraFormFieldInterface = {
            type: 'text',
            isList: `[${min},${max}]`
        };

        it(`should add controls to the given list of #controls until the minimum of the range is reached`, () =>
        {
            const controls:Array<AbstractControl> = [];
            TerraFormHelper['fitControlsToRange'](listFormField, controls);
            expect(controls.length).toBe(min);
        });

        it(`should remove controls to the given list of #controls if it exceeds the maximum of the range`, () =>
        {
            const controls:Array<AbstractControl> = Array(max + 1).fill(new FormControl());
            TerraFormHelper['fitControlsToRange'](listFormField, controls);
            expect(controls.length).toBe(max);
        });

        it(`should not change anything on the list of #controls if its length is in the given range`, () =>
        {
            const count:number = min + 1;
            const controls:Array<AbstractControl> = Array(count).fill(new FormControl());
            const controlsCopy:Array<AbstractControl> = controls.slice();
            TerraFormHelper['fitControlsToRange'](listFormField, controls);
            expect(controls.length).toBe(count);
            expect(controls).toEqual(controlsCopy);
        });
    });
});
