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
    const control1:TerraFormFieldInterface = {type: 'text', defaultValue: 'one'};
    const control2:TerraFormFieldInterface = {type: 'text', defaultValue: 'two'};
    const controlWithArray:TerraFormFieldInterface = {type: 'checkboxGroup', defaultValue: [1, 2]};
    const controlWithObject:TerraFormFieldInterface = {type: 'text', defaultValue: {foo: 'bar'}};
    const controlWithChildren:TerraFormFieldInterface = {type: 'horizontal', children: {child1: control1, child2: controlWithArray}};
    const controlList:TerraFormFieldInterface = {type: 'number', isList: true, defaultValue: 5};
    const min:number = 3; const max:number = 5;
    const controlListWithRange:TerraFormFieldInterface = {type: 'text', isList: `[${min},${max}]`};

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

            const objectValue:Object = {child1: 'bla', child2: [3, 4, 5]};
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
});
