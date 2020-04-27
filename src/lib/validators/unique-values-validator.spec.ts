import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { uniqueValuesValidator } from './unique-values-validator';

describe('uniqueCombinationValidator', () => {
  let formArrayWithFormControls: FormArray;

  let formArrayWithFormGroups: FormArray;

  beforeEach(() => {
    formArrayWithFormControls = new FormArray([new FormControl('foo'), new FormControl('bar')]);

    formArrayWithFormGroups = new FormArray([
      new FormGroup({
        foo: new FormControl('foo'),
        bar: new FormControl('bar')
      }),
      new FormGroup({
        foo: new FormControl('foobar'),
        bar: new FormControl('baz')
      })
    ]);
  });

  it(`should return #null if all entries are unique`, () => {
    expect(uniqueValuesValidator()(formArrayWithFormControls)).toBeNull();
  });

  it(`should return #uniqueCombination error if two (or more) entries are not unique`, () => {
    formArrayWithFormControls.setValue(['foo', 'foo']);
    expect(
      uniqueValuesValidator()(formArrayWithFormControls).hasOwnProperty('uniqueCombination')
    ).toBe(true);
  });

  it(`should return #null if the values of all given keys are unique`, () => {
    expect(uniqueValuesValidator(['foo'])(formArrayWithFormGroups)).toBeNull();
    expect(uniqueValuesValidator(['bar'])(formArrayWithFormGroups)).toBeNull();
    expect(uniqueValuesValidator(['foo', 'bar'])(formArrayWithFormGroups)).toBeNull();
  });

  it(`should return #uniqueCombination error if two (or more) of the values of all given keys are not unique`, () => {
    formArrayWithFormGroups.setValue([
      { foo: 'foo', bar: 'bar' },
      { foo: 'foo', bar: 'bar' }
    ]);

    expect(
      uniqueValuesValidator(['foo'])(formArrayWithFormGroups).hasOwnProperty('uniqueCombination')
    ).toBe(true);
    expect(
      uniqueValuesValidator(['bar'])(formArrayWithFormGroups).hasOwnProperty('uniqueCombination')
    ).toBe(true);
    expect(
      uniqueValuesValidator(['foo', 'bar'])(formArrayWithFormGroups).hasOwnProperty(
        'uniqueCombination'
      )
    ).toBe(true);
  });
});
