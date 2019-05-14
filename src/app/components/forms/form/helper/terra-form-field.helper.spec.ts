import { TerraFormFieldHelper } from './terra-form-field.helper';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { isNullOrUndefined } from 'util';
import { listWithChildren } from '../example/form-fields';
import { TerraKeyValueInterface } from '../../../../..';

fdescribe(`TerraFormFieldHelper.`, () =>
{
    const child1:TerraFormFieldInterface = {type: 'text', defaultValue: 'one'};
    const child2:TerraFormFieldInterface = {type: 'text', defaultValue: [1, 2]};

    const formFields:{ [key:string]:TerraFormFieldInterface } = {
        control1: {type: 'text', defaultValue: 'one'},
        control2: {type: 'text', defaultValue: 'two'},
        controlWithArray: {type: 'text', defaultValue: [1, 2]},
        controlWithObject: {type: 'text', defaultValue: {foo: 'bar'}},
        controlWithChildren: {type: 'horizontal', children: {child1: child1, child2: child2}},
        controlList: {type: 'number', isList: true, defaultValue: 5},
        controlListWithoutDefaultValue: {type: 'number', isList: true}
    };

    describe(`parseSingleDefaultValue() `, () =>
    {
        it('should parses the default value correctly', () =>
        {
            const value:any = TerraFormFieldHelper.parseSingleDefaultValue(formFields.control1);

            expect(value).toBe(formFields.control1.defaultValue);
        });

        it('should create a new instance of an array or object', () =>
        {
            const arrayValue:any = TerraFormFieldHelper.parseSingleDefaultValue(formFields.controlWithArray);
            const objectValue:any = TerraFormFieldHelper.parseSingleDefaultValue(formFields.controlWithObject);

            // Check if the values are new instances, but with the same 'content'
            expect(arrayValue).not.toBe(formFields.controlWithArray.defaultValue);
            expect(arrayValue).toEqual(formFields.controlWithArray.defaultValue);

            expect(objectValue).not.toBe(formFields.controlWithObject.defaultValue);
            expect(objectValue).toEqual(formFields.controlWithObject.defaultValue);
        });

        it('should parses child "defaultValue" as well', () =>
        {
            const childrenValues:any = TerraFormFieldHelper.parseSingleDefaultValue(formFields.controlWithChildren);

            // Did we get an object back?
            expect(childrenValues.constructor).toBe(Object);

            // Has the object the expected properties?
            expect(childrenValues.hasOwnProperty('child1')).toBe(true);
            expect(childrenValues.hasOwnProperty('child2')).toBe(true);
            expect(Object.keys(childrenValues).length).toBe(Object.keys(formFields.controlWithChildren).length);

            // Check the values of the properties
            expect(childrenValues.child1).toBe(child1.defaultValue);

            expect(childrenValues.child2).not.toBe(child2.defaultValue);
            expect(childrenValues.child2).toEqual(child2.defaultValue);
        });

        it('should return an empty array if it "isList" and has no "defaultValue"', () =>
        {
            const isList:any = TerraFormFieldHelper.parseSingleDefaultValue(formFields.controlListWithoutDefaultValue);

            expect(isList).toEqual([]);
        });

        it(`should parse a formField's #defaultValue, even if #isList is set and it has #children - nested default values`, () =>
        {
            const formField:TerraFormFieldInterface = listWithChildren;

            // formField with children and isList and a given default value
            const defaultValue:any = TerraFormFieldHelper.parseSingleDefaultValue(formField);
            const min:number = TerraFormFieldHelper.getListRange(formField.isList)[0];
            expect(defaultValue).toEqual([].fill(formField.defaultValue, 0, min));

            // formField with children and isList but no default value
            delete formField.defaultValue;
            let groupDefaultValue:TerraKeyValueInterface<any> = TerraFormFieldHelper.parseSingleDefaultValue(formField, true);
            expect(defaultValue).toEqual([].fill(groupDefaultValue, 0, min));
        });
    });
});
