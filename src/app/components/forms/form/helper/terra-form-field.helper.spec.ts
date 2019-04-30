import { TerraFormFieldHelper } from './terra-form-field.helper';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';

fdescribe(`TerraFormFieldHelper:`, () =>
{
    const child1:TerraFormFieldInterface = {type: 'text', defaultValue: 'one'};
    const child2:TerraFormFieldInterface = {type: 'text', defaultValue: [1, 2]};

    const formFields:{ [key:string]:TerraFormFieldInterface } = {
        control1: {type: 'text', defaultValue: 'one'},
        control2: {type: 'text', defaultValue: 'two'},
        controlWithArray: {type: 'text', defaultValue: [1, 2]},
        controlWithObject: {type: 'text', defaultValue: {foo: 'bar'}},
        controlWithChildren: {type: 'horizontal', children: {child1: child1, child2: child2}},
        controlList: {type: 'number', isList: true, defaultValue: [5, 6]},
        controlListWithoutDefaultValue: {type: 'number', isList: true}
    };

    it('should parses the default value correctly', () =>
    {
        const value:any = TerraFormFieldHelper.parseDefaultValueFromFormField(formFields.control1);

        expect(value).toBe('one');
    });

    it('should create a new instance of an array or object', () =>
    {
        const arrayValue:any = TerraFormFieldHelper.parseDefaultValueFromFormField(formFields.controlWithArray);
        const objectValue:any = TerraFormFieldHelper.parseDefaultValueFromFormField(formFields.controlWithObject);

        // Check if the values are new instances, but with the same 'content'
        expect(arrayValue).not.toBe(formFields.controlWithArray.defaultValue);
        expect(arrayValue).toEqual(formFields.controlWithArray.defaultValue);

        expect(objectValue).not.toBe(formFields.controlWithObject.defaultValue);
        expect(objectValue).toEqual(formFields.controlWithObject.defaultValue);
    });

    it('should parses child "defaultValue" as well', () =>
    {
        const childrenValues:any = TerraFormFieldHelper.parseDefaultValueFromFormField(formFields.controlWithChildren);

        // Did we get an object back?
        expect(childrenValues.constructor).toBe(Object);

        // Has the object the expected properties?
        expect(childrenValues.hasOwnProperty('child1')).toBe(true);
        expect(childrenValues.hasOwnProperty('child2')).toBe(true);
        expect(Object.keys(childrenValues).length).toBe(2);

        // Check the values of the properties
        expect(childrenValues.child1).toBe(child1.defaultValue);

        expect(childrenValues.child2).not.toBe(child2.defaultValue);
        expect(childrenValues.child2).toEqual(child2.defaultValue);
    });

    it('should return an empty array if it "isList" and has no "defaultValue"', () =>
    {
        const isList:any = TerraFormFieldHelper.parseDefaultValueFromFormField(formFields.controlListWithoutDefaultValue);

        expect(isList).toEqual([]);
    });

    it('should return an new array of "defaultValue" if it "isList"', () =>
    {
        const isList:any = TerraFormFieldHelper.parseDefaultValueFromFormField(formFields.controlList);

        expect(isList).not.toBe(formFields.controlList);
        expect(isList).toEqual(formFields.controlList.defaultValue);
    });
});
