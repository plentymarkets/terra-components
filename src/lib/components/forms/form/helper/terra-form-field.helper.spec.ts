import { TerraFormFieldHelper } from './terra-form-field.helper';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { listWithChildren } from '../example/form-fields';
import { TerraKeyValueInterface } from '../../../../models';

describe(`TerraFormFieldHelper:`, () => {
  const child1: TerraFormFieldInterface = { type: 'text', defaultValue: 'one' };
  const child2: TerraFormFieldInterface = { type: 'text', defaultValue: [1, 2] };

  const formFields: { [key: string]: TerraFormFieldInterface } = {
    control1: { type: 'text', defaultValue: 'one' },
    control2: { type: 'text', defaultValue: 'two' },
    controlWithArray: { type: 'text', defaultValue: [1, 2] },
    controlWithObject: { type: 'text', defaultValue: { foo: 'bar' } },
    controlWithChildren: { type: 'horizontal', children: { child1: child1, child2: child2 } },
    controlList: { type: 'number', isList: true, defaultValue: 5 },
    controlListWithoutDefaultValue: { type: 'number', isList: true }
  };

  describe(`parseDefaultValue() `, () => {
    beforeEach(() => spyOn(console, 'error')); // disable console output

    it('should parses the default value correctly', () => {
      const value: any = TerraFormFieldHelper.parseDefaultValue(formFields.control1);

      expect(value).toBe(formFields.control1.defaultValue);
    });

    it('should create a new instance of an array or object', () => {
      const arrayValue: any = TerraFormFieldHelper.parseDefaultValue(formFields.controlWithArray);
      const objectValue: any = TerraFormFieldHelper.parseDefaultValue(formFields.controlWithObject);

      // Check if the values are new instances, but with the same 'content'
      expect(arrayValue).not.toBe(formFields.controlWithArray.defaultValue);
      expect(arrayValue).toEqual(formFields.controlWithArray.defaultValue);

      expect(objectValue).not.toBe(formFields.controlWithObject.defaultValue);
      expect(objectValue).toEqual(formFields.controlWithObject.defaultValue);
    });

    it('should parses child "defaultValue" as well', () => {
      const childrenValues: any = TerraFormFieldHelper.parseDefaultValue(
        formFields.controlWithChildren
      );

      // Did we get an object back?
      expect(childrenValues.constructor).toBe(Object);

      // Has the object the expected properties?
      expect(childrenValues.hasOwnProperty('child1')).toBe(true);
      expect(childrenValues.hasOwnProperty('child2')).toBe(true);
      expect(Object.keys(childrenValues).length).toBe(
        Object.keys(formFields.controlWithChildren).length
      );

      // Check the values of the properties
      expect(childrenValues.child1).toBe(child1.defaultValue);

      expect(childrenValues.child2).not.toBe(child2.defaultValue);
      expect(childrenValues.child2).toEqual(child2.defaultValue);
    });

    it('should return an empty array if it "isList" and has no "defaultValue"', () => {
      const isList: any = TerraFormFieldHelper.parseDefaultValue(
        formFields.controlListWithoutDefaultValue
      );

      expect(isList).toEqual([]);
    });

    it(`should parse a formField's #defaultValue, even if #isList is set and it has #children - nested default values`, () => {
      const formField: TerraFormFieldInterface = { ...listWithChildren };

      // formField with children and isList and a given object default value
      const defaultValue: any = TerraFormFieldHelper.parseDefaultValue(formField);
      const min: number = TerraFormFieldHelper.getListRange(formField.isList)[0];
      expect(defaultValue).toEqual(Array(min).fill(formField.defaultValue));

      // formField with children and isList and a given array default value
      formField.defaultValue = [];
      const arrayDefaultValue: Array<any> = TerraFormFieldHelper.parseDefaultValue(formField);
      expect(arrayDefaultValue).toEqual(formField.defaultValue);

      // formField with children and isList but no default value
      delete formField.defaultValue;
      const composedArrayDefault: Array<any> = TerraFormFieldHelper.parseDefaultValue(formField);
      const groupDefaultValue: TerraKeyValueInterface<any> = TerraFormFieldHelper.parseDefaultValue(
        formField,
        true
      );
      expect(composedArrayDefault).toEqual(Array(min).fill(groupDefaultValue));
    });

    it(`must not return a list at any time if #skipList is set`, () => {
      const formField: TerraFormFieldInterface = { ...listWithChildren };
      let defaultValue: any = TerraFormFieldHelper.parseDefaultValue(formField, true);

      expect(Array.isArray(defaultValue)).toBe(false);
      expect(defaultValue).toEqual(formField.defaultValue);

      let defaultValuesOfChildren: {} = {}; // TODO: Maybe use `parseDefaultValues()` here
      Object.keys(formField.children).forEach((fKey: string) => {
        let child: TerraFormFieldInterface = formField.children[fKey];
        defaultValuesOfChildren[fKey] = child.defaultValue;
      });

      formField.defaultValue = [];
      defaultValue = TerraFormFieldHelper.parseDefaultValue(formField, true);
      expect(Array.isArray(defaultValue)).toBe(false);
      expect(defaultValue).toEqual(defaultValuesOfChildren);

      delete formField.defaultValue;
      defaultValue = TerraFormFieldHelper.parseDefaultValue(formField, true);
      expect(Array.isArray(defaultValue)).toBe(false);
      expect(defaultValue).toEqual(defaultValuesOfChildren);
    });
  });
});
