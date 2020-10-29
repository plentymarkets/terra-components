import { DebugElement } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraDoubleInputComponent } from './terra-double-input.component';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import { mockL10nConfig } from 'src/lib/testing/mock-l10n-config';

describe('TerraDoubleInputComponent', () => {
    let component: TerraDoubleInputComponent;
    let fixture: ComponentFixture<TerraDoubleInputComponent>;
    let debugElement: DebugElement;
    let inputElement: HTMLInputElement;
    const testValue: number = 3.2;
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TerraDoubleInputComponent, TerraButtonComponent],
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
        fixture = TestBed.createComponent(TerraDoubleInputComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('input'));
        inputElement = debugElement.nativeElement;

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('component should be invalid after validating the input with wrong regex', () => {
        const formControl: FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.IBAN_BIC)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBe(false);
    });

    it('component should be valid after validating the input with correct regex', () => {
        const formControl: FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.DOUBLE)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBe(true);
    });

    it('inputs should be initialized correctly', () => {
        expect(component.regex).toEqual(TerraRegex.getDouble(component.inputDecimalCount));
        expect(component.inputIsPriceInput).toBe(false);
        expect(component.inputDecimalCount).toEqual(2);
    });

    it('component should have price-input css if input is given', () => {
        component.inputIsPriceInput = true;
        fixture.detectChanges();
        expect(debugElement.classes.hasOwnProperty('price-input')).toBeTruthy();
    });

    it('should focus inputElement if #focusNativeInput is called', fakeAsync(() => {
        component.focusNativeInput();
        flush();
        expect(document.activeElement).toEqual(inputElement);
    }));
});
