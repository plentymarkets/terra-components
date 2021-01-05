import { TerraColorPickerComponent } from './terra-color-picker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { L10nTranslationModule } from 'angular-l10n';
import { By } from '@angular/platform-browser';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';
import { Color, ColorRGB } from '../../../../helpers';
import { DebugElement } from '@angular/core';

describe('Component: TerraColorPickerComponent', () => {
    let component: TerraColorPickerComponent;
    let fixture: ComponentFixture<TerraColorPickerComponent>;

    const white: string = '#ffffff';
    const testColor: string = '#123456';
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TerraColorPickerComponent],
            imports: [FormsModule, L10nTranslationModule.forRoot(mockL10nConfig)],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraColorPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it("should constructor's regex be defined", () => {
        expect(component.regex).toBeDefined();
        expect(component.regex).toEqual(TerraRegex.COLOR_HEX);
    });

    it('should color regex be defined and the value of input be #ffffff', () => {
        expect(component.color).toBeDefined();
        expect(component.color).toEqual(white);
    });

    it('should getter of color return the value of the input or #ffffff', () => {
        expect(component.color).toEqual(white);
        component.color = testColor;
        expect(component.color).toEqual(testColor);
    });

    it('should isDark return true if color is dark', () => {
        component.color = '#123456';
        expect(component.isDark()).toBe(true);
        component.color = '#000000';
        expect(component.isDark()).toBe(true);

        component.color = '#ABCDEF';
        expect(component.isDark()).toBe(false);
        component.color = '#FFFFFF';
        expect(component.isDark()).toBe(false);
    });

    it('should display a given color in the graphical picker', () => {
        component.color = testColor;
        fixture.detectChanges();
        const colorDisplayDebug: HTMLElement = fixture.debugElement.query(By.css('div.color-picker')).nativeElement;
        expect(colorDisplayDebug).toBeTruthy();
        expect(colorDisplayDebug.style.backgroundColor).toBeTruthy();
        expect(colorDisplayDebug.style.backgroundColor).toEqual(toRGBValue(testColor));
    });

    it('should reference an input with a label', () => {
        const name: string = 'test-color';
        component.inputName = name;
        fixture.detectChanges();
        const reference: DebugElement = fixture.debugElement.query(By.css('#' + name));
        const label: DebugElement = fixture.debugElement.query(By.css('label[for=' + name + ']'));
        console.log(label);
        expect(reference.name).toBe('input');
        expect(label.properties['for']).toEqual(name);
    });
});

/**
    Converts HEX strings to color format `rgb(r, g, b)`
    @param color
 */
function toRGBValue(color: string): string {
    const rgbColor: ColorRGB = new Color(color).toRGB();
    return 'rgb(' + rgbColor.r + ', ' + rgbColor.g + ', ' + rgbColor.b + ')';
}
