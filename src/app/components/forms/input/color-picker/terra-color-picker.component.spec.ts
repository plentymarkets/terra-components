import { TerraColorPickerComponent } from './terra-color-picker.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { TooltipModule } from 'ngx-bootstrap';
import { l10nConfig } from '../../../../translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraRegex } from '../../../../..';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: TerraColorPickerComponent', () =>
{
    let component:any = new TerraColorPickerComponent();
    let expectedColor:string = '';
    let fixture:ComponentFixture<TerraColorPickerComponent>;
    let inputElement:HTMLInputElement;
    let inputDebugElement:DebugElement;

    beforeEach(() =>
        {
            TestBed.configureTestingModule(
                {
                    declarations: [TerraColorPickerComponent,
                                   TerraLabelTooltipDirective],
                    imports: [
                        TooltipModule.forRoot(),
                        FormsModule,
                        LocalizationModule.forRoot(l10nConfig)
                    ]
                }
            ).compileComponents();
        }
    );

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraColorPickerComponent);
        component = fixture.componentInstance;
        inputDebugElement = fixture.debugElement.query(By.css('input'));
        inputElement = inputDebugElement.nativeElement;

        expectedColor = '#ffffff';

        fixture.detectChanges();
    });

    afterEach(() =>
    {
        expectedColor = '';
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should constructor\'s regex be defined', () =>
    {
        expect(component.regex).toBeDefined();
        expect(component.regex).toEqual(TerraRegex.COLOR_HEX);
    });

    it('should color regex be defined and the value of input be #ffffff', () =>
    {
        expect(component.color).toBeDefined();
        expect(component.color).toEqual(expectedColor);
    });

    it('should getter of color return the value of the input or #ffffff', () =>
    {
        expect(component.color).toEqual(expectedColor);
        expectedColor = '#123456';
        component.color = expectedColor;
        expect(component.color).toEqual(expectedColor);
    });

    it('should isDark return true if color is dark', () =>
    {
        component.color = '#123456';
        expect(component.isDark()).toBe(true);
        component.color = '#000000';
        expect(component.isDark()).toBe(true);

        component.color = '#ABCDEF';
        expect(component.isDark()).toBe(false);
        component.color = '#FFFFFF';
        expect(component.isDark()).toBe(false);
    });

    it('should display a given color in the graphical picker', () =>
    {
        expectedColor = '#123456';
        component.color = expectedColor;
        fixture.detectChanges();
        inputDebugElement = fixture.debugElement.query(By.css('div.color-picker'));
        expect(inputDebugElement).toBeTruthy();
        expect(inputDebugElement.styles['background-color']).toBeTruthy();
        expect(inputDebugElement.styles['background-color']).toEqual(expectedColor);
    });
});
