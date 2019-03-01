import { TerraMultiCheckBoxComponent } from './terra-multi-check-box.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';
import { TerraCheckboxComponent } from '../checkbox/terra-checkbox.component';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import { By } from '@angular/platform-browser';
import {
    DebugElement,
    EventEmitter
} from '@angular/core';

describe('TerraMultiCheckBoxComponent:', () =>
{
    let component:TerraMultiCheckBoxComponent;
    let fixture:ComponentFixture<TerraMultiCheckBoxComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [
                    CheckboxGroupComponent,
                    TerraCheckboxComponent,
                    TerraMultiCheckBoxComponent
                ],
                imports:      [
                    HttpClientModule,
                    TooltipModule.forRoot(),
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ]
            }
        ).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraMultiCheckBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should init its inputs and outputs`, () =>
    {
        expect(component.collapsed).toBe(false);
        expect(component.inputIsDisabled).toBe(false);
        expect(component.inputName).toBe('terraMultiCheckBox.selectAll');
        expect(component.checkboxStateChanges).toBeTruthy();
        expect(component.checkboxStateChanges instanceof EventEmitter).toBe(true);
    });

    it('should not toggle #collapsed if #inputIsDisabled is true', () =>
    {
        component.inputIsDisabled = true;
        let headerDE:DebugElement = fixture.debugElement.query(By.css('.multiselect-header'));
        headerDE.nativeElement.click();

        expect(component.collapsed).toBe(false);
    });

    it('should toggle #collapsed if the component #inputDisabled is false', () =>
    {
        let headerDE:DebugElement = fixture.debugElement.query(By.css('.multiselect-header'));
        headerDE.nativeElement.click();

        expect(component.collapsed).toBe(true);
    });

    it('should display the option list depending on #collapsed', () =>
    {
        let optionListDE:DebugElement = fixture.debugElement.query(By.css('.option-list'));
        expect(optionListDE.nativeElement.hidden).toBe(false);
        component.collapsed = true;
        fixture.detectChanges();
        expect(optionListDE.nativeElement.hidden).toBe(true);
    });

    it('should show the proper icon depending on #collapsed', () =>
    {
        let icon:DebugElement = fixture.debugElement.query(By.css('.icon-collapse_up'));
        expect(icon).toBeTruthy();

        component.collapsed = true;
        fixture.detectChanges();

        icon = fixture.debugElement.query(By.css('.icon-collapse_down'));
        expect(icon).toBeTruthy();
    });
});
