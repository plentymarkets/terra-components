import { TerraColorPickerComponent } from './terra-color-picker.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { L10nTranslationModule } from 'angular-l10n';
import { By } from '@angular/platform-browser';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';
import { Color, ColorRGB } from '../../../../helpers';
import { MockTooltipDirective } from '../../../../testing/mock-tooltip.directive';

describe('Component: TerraColorPickerComponent', () => {
    let component: TerraColorPickerComponent;
    let fixture: ComponentFixture<TerraColorPickerComponent>;

    const white: string = '#ffffff';
    const testColor: string = '#123456';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TerraColorPickerComponent],
            imports: [FormsModule, L10nTranslationModule.forRoot(mockL10nConfig)]
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
        let colorDisplayDebug: HTMLElement = fixture.debugElement.query(By.css('div.color-picker')).nativeElement;
        expect(colorDisplayDebug).toBeTruthy();
        expect(colorDisplayDebug.style.backgroundColor).toBeTruthy();
        expect(colorDisplayDebug.style.backgroundColor).toEqual(toRGBValue(testColor));
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
