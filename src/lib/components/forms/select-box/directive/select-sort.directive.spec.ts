import Spy = jasmine.Spy;
import { SimpleChange } from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { SelectSortDirective } from './select-sort.directive';
import { By } from '@angular/platform-browser';
import { TerraSelectBoxComponent } from '../terra-select-box.component';
import {
    SortHelper,
    TerraSelectBoxValueInterface,
    TooltipDirective
} from '../../../..';

/* tslint:disable-next-line:max-function-line-count */
describe('SelectSortDirective: ', () =>
{
    let component:TerraSelectBoxComponent;
    let directive:SelectSortDirective;
    let fixture:ComponentFixture<TerraSelectBoxComponent>;

    const listBoxValue1:TerraSelectBoxValueInterface = {
        caption: 'Value 01',
        value:   1
    };
    const listBoxValue2:TerraSelectBoxValueInterface = {
        caption: 'Value 02',
        value:   2
    };
    const listBoxValue3:TerraSelectBoxValueInterface = {
        caption: 'Value 03',
        value:   3,
    };

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports:      [
                FormsModule,
                LocalizationModule
            ],
            declarations: [
                TooltipDirective,
                TerraSelectBoxComponent,
                SelectSortDirective
            ]
        }).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraSelectBoxComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(SelectSortDirective)).nativeElement as SelectSortDirective;

        component.inputListBoxValues = []; // this also resets the selectedValue to null
    });

    it(`should enable sorting by default`, () =>
    {
        const spy:Spy = spyOn(SortHelper, 'sortArray').and.callThrough();
        expect(directive.disableSorting).toBe(false);
        component.inputListBoxValues = [listBoxValue2, listBoxValue3, listBoxValue1];

        component.ngOnChanges({
            inputListBoxValues: new SimpleChange([], component.inputListBoxValues, false)
        });

        expect(spy).toHaveBeenCalledWith(component.inputListBoxValues, directive.sortDirection, 'caption');
        expect(component.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2, listBoxValue3]);
    });

    it(`should not sort #inputListBoxValues if #disableSorting is true`, () =>
    {
        const spy:Spy = spyOn(SortHelper, 'sortArray').and.callThrough();
        component.inputListBoxValues = [listBoxValue1, listBoxValue2];
        directive.disableSorting = true;

        component.ngOnChanges({
            disableSorting:     new SimpleChange(false, true, false),
            inputListBoxValues: new SimpleChange([], component.inputListBoxValues, false)
        });

        expect(spy).not.toHaveBeenCalled();
        expect(component.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2]);
    });

    it(`should sort #inputListBoxValues depending on the #sortDirection prop`, () =>
    {
        const spy:Spy = spyOn(SortHelper, 'sortArray').and.callThrough();
        component.inputListBoxValues = [listBoxValue3, listBoxValue1, listBoxValue2];

        component.ngOnChanges({
            inputListBoxValues: new SimpleChange([], component.inputListBoxValues, false)
        });

        expect(component.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2, listBoxValue3]);

        directive.sortDirection = 'desc';
        component.ngOnChanges({
            sortDirection: new SimpleChange('asc', 'desc', false)
        });

        expect(spy).toHaveBeenCalledWith(component.inputListBoxValues, directive.sortDirection, 'caption');
        expect(component.inputListBoxValues).toEqual([listBoxValue3, listBoxValue2, listBoxValue1]);
    });
});
