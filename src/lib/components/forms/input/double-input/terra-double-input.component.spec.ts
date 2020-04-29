import { DebugElement } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../../app/translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraDoubleInputComponent } from './terra-double-input.component';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';

describe('TerraDoubleInputComponent', () => {
    let component: TerraDoubleInputComponent;
    let fixture: ComponentFixture<TerraDoubleInputComponent>;
    let debugElement: DebugElement;
    let inputElement: HTMLInputElement;
    const testValue: number = 3.2;
    const router: MockRouter = new MockRouter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TooltipDirective,
                TerraDoubleInputComponent,
                TerraButtonComponent,
                TerraLabelTooltipDirective
            ],
            imports: [FormsModule, LocalizationModule.forRoot(l10nConfig)],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        }).compileComponents();
    }));

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

        expect(debugElement.classes.hasOwnProperty('price-input')).toBeTruthy();
    });

    it('should focus inputElement if #focusNativeInput is called', fakeAsync(() => {
        component.focusNativeInput();
        flush();
        expect(document.activeElement).toEqual(inputElement);
    }));
});
