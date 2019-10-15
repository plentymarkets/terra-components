import {
    FormArray,
    FormControl,
    FormGroup
} from '@angular/forms';
import { uniqueCombinationValidator } from './unique-combination-validator';

fdescribe('uniqueCombinationValidator', () =>
{
    let formArrayWithFormControls:FormArray;

    let formArrayWithFormGroups:FormArray;

    beforeEach(() =>
    {
        formArrayWithFormControls = new FormArray([
            new FormControl('foo'),
            new FormControl('bar')
        ]);

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

    it(`should return #null if all entries are unique`, () =>
    {
        expect(uniqueCombinationValidator()(formArrayWithFormControls)).toBeNull();
    });

    it(`should return #uniqueCombination error if two (or more) entries are not unique`, () =>
    {
        formArrayWithFormControls.setValue(['foo', 'foo']);
        expect(uniqueCombinationValidator()(formArrayWithFormControls).hasOwnProperty('uniqueCombination')).toBe(true);
    });

    it(`should return #null if the values of all given keys are unique`, () =>
    {
        expect(uniqueCombinationValidator(['foo'])(formArrayWithFormGroups)).toBeNull();
        expect(uniqueCombinationValidator(['bar'])(formArrayWithFormGroups)).toBeNull();
        expect(uniqueCombinationValidator(['foo', 'bar'])(formArrayWithFormGroups)).toBeNull();
    });

    it(`should return #uniqueCombination error if two (or more) of the values of all given keys are not unique`, () =>
    {
        formArrayWithFormGroups.setValue([{foo: 'foo', bar: 'bar'}, {foo: 'foo', bar: 'bar'}]);

        expect(uniqueCombinationValidator(['foo'])(formArrayWithFormGroups).hasOwnProperty('uniqueCombination')).toBe(true);
        expect(uniqueCombinationValidator(['bar'])(formArrayWithFormGroups).hasOwnProperty('uniqueCombination')).toBe(true);
        expect(uniqueCombinationValidator(['foo', 'bar'])(formArrayWithFormGroups).hasOwnProperty('uniqueCombination')).toBe(true);
    });
});
