import { SimpleChange } from '@angular/core';
import { SelectSortDirective } from './select-sort.directive';
import { SortHelper, TerraSelectBoxValueInterface } from '../../../..';
import Spy = jasmine.Spy;

/* tslint:disable-next-line:max-function-line-count */
describe('SelectSortDirective: ', () => {
    let directive: SelectSortDirective;

    const listBoxValue1: TerraSelectBoxValueInterface = {
        caption: 'Value 01',
        value: 1
    };
    const listBoxValue2: TerraSelectBoxValueInterface = {
        caption: 'Value 02',
        value: 2
    };
    const listBoxValue3: TerraSelectBoxValueInterface = {
        caption: 'Value 03',
        value: 3
    };

    beforeEach(() => {
        directive = new SelectSortDirective();

        directive.inputListBoxValues = []; // this also resets the selectedValue to null
    });

    it(`should enable sorting by default`, () => {
        const spy: Spy = spyOn(SortHelper, 'sortArray').and.callThrough();
        expect(directive.disableSorting).toBe(false);
        directive.inputListBoxValues = [listBoxValue2, listBoxValue3, listBoxValue1];

        directive.ngOnChanges({
            inputListBoxValues: new SimpleChange([], directive.inputListBoxValues, false)
        });

        expect(spy).toHaveBeenCalledWith(directive.inputListBoxValues, directive.sortDirection, 'caption');
        expect(directive.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2, listBoxValue3]);
    });

    it(`should not sort #inputListBoxValues if #disableSorting is true`, () => {
        const spy: Spy = spyOn(SortHelper, 'sortArray').and.callThrough();
        directive.inputListBoxValues = [listBoxValue1, listBoxValue2];
        directive.disableSorting = true;

        directive.ngOnChanges({
            disableSorting: new SimpleChange(false, true, false),
            inputListBoxValues: new SimpleChange([], directive.inputListBoxValues, false)
        });

        expect(spy).not.toHaveBeenCalled();
        expect(directive.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2]);
    });

    it(`should sort #inputListBoxValues depending on the #sortDirection prop`, () => {
        const spy: Spy = spyOn(SortHelper, 'sortArray').and.callThrough();
        directive.inputListBoxValues = [listBoxValue3, listBoxValue1, listBoxValue2];

        directive.ngOnChanges({
            inputListBoxValues: new SimpleChange([], directive.inputListBoxValues, false)
        });

        expect(directive.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2, listBoxValue3]);

        directive.sortDirection = 'desc';
        directive.ngOnChanges({
            sortDirection: new SimpleChange('asc', 'desc', false)
        });

        expect(spy).toHaveBeenCalledWith(directive.inputListBoxValues, directive.sortDirection, 'caption');
        expect(directive.inputListBoxValues).toEqual([listBoxValue3, listBoxValue2, listBoxValue1]);
    });
});
