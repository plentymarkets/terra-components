import { TerraSelectBoxComponent } from './terra-select-box.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../app/translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { By } from '@angular/platform-browser';
import { AllowedColors } from './data/allowed.colors.enum';
import {
    DebugElement,
    SimpleChange
} from '@angular/core';
import { SelectBoxSortHelper } from '../../../helpers/select-box-sort.helper';
import Spy = jasmine.Spy;

/**
 * @author mfrank
 */
describe('TerraSelectBoxComponent:', () =>
{
    let component:TerraSelectBoxComponent;
    let fixture:ComponentFixture<TerraSelectBoxComponent>;

    let listBoxValue1:TerraSelectBoxValueInterface = {
        caption: 'Value 01',
        value:   1
    };

    let listBoxValue2:TerraSelectBoxValueInterface = {
        caption: 'Value 02',
        value:   2
    };

    let listBoxValue3:TerraSelectBoxValueInterface = {
        caption: 'Value 03',
        value:   3,
        color:   AllowedColors.add
    };

    const listBoxValues:Array<TerraSelectBoxValueInterface> = [listBoxValue1, listBoxValue2];

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [
                    TooltipDirective,
                    TerraSelectBoxComponent,
                    TerraLabelTooltipDirective
                ],
                imports:      [
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ]
            }
        ).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraSelectBoxComponent);
        component = fixture.componentInstance;

        component.inputListBoxValues = []; // this also resets the selectedValue to null
        component.value = null;

        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    // TODO test does not work properly
    xit('should set color for caption', () =>
    {
        component.inputListBoxValues.push(listBoxValue3);
        fixture.detectChanges();
        let selectBoxDE:DebugElement = fixture.debugElement.query(By.css('div.select-box'));
        let spanElement:DebugElement = selectBoxDE.query(By.css('span'));
        expect(spanElement.styles['color']).toBe('var(--color-group-add)');
    });

    it(`should enable sorting by default`, () =>
    {
        const spy:Spy = spyOn(SelectBoxSortHelper, 'sortArray').and.callThrough();
        expect(component.disableSorting).toBe(false);
        component.inputListBoxValues = [listBoxValue2, listBoxValue3, listBoxValue1];

        component.ngOnChanges({
            inputListBoxValues: new SimpleChange([], component.inputListBoxValues, false)
        });

        expect(spy).toHaveBeenCalledWith(component.inputListBoxValues, component.sortDirection, 'caption');
        expect(component.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2, listBoxValue3]);
    });

    it(`should not sort #inputListBoxValues if #disableSorting is true`, () =>
    {
        const spy:Spy = spyOn(SelectBoxSortHelper, 'sortArray').and.callThrough();
        component.inputListBoxValues = [listBoxValue1, listBoxValue2];
        component.disableSorting = true;

        component.ngOnChanges({
            disableSorting:     new SimpleChange(false, true, false),
            inputListBoxValues: new SimpleChange([], component.inputListBoxValues, false)
        });

        expect(spy).not.toHaveBeenCalled();
        expect(component.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2]);
    });

    it(`should sort #inputListBoxValues depending on the #sortDirection prop`, () =>
    {
        const spy:Spy = spyOn(SelectBoxSortHelper, 'sortArray').and.callThrough();
        component.inputListBoxValues = [listBoxValue3, listBoxValue1, listBoxValue2];

        component.ngOnChanges({
            inputListBoxValues: new SimpleChange([], component.inputListBoxValues, false)
        });

        expect(component.inputListBoxValues).toEqual([listBoxValue1, listBoxValue2, listBoxValue3]);

        component.sortDirection = 'desc';
        component.ngOnChanges({
            sortDirection: new SimpleChange('asc', 'desc', false)
        });

        expect(spy).toHaveBeenCalledWith(component.inputListBoxValues, component.sortDirection, 'caption');
        expect(component.inputListBoxValues).toEqual([listBoxValue3, listBoxValue2, listBoxValue1]);
    });
});
