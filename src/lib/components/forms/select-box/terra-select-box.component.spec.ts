import { TerraSelectBoxComponent } from './terra-select-box.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../app/translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { TerraSelectBoxValueInterface } from './data/terra-select-box.interface';
import { By } from '@angular/platform-browser';
import { AllowedColors } from './data/allowed.colors.enum';
import { DebugElement } from '@angular/core';

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

    let listBoxValues:Array<TerraSelectBoxValueInterface> = [listBoxValue1,
                                                             listBoxValue2];

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [
                    TerraSelectBoxComponent,
                    TerraLabelTooltipDirective
                ],
                imports:      [
                    TooltipModule.forRoot(),
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
});
