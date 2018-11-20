import {
    DebugElement,
    ElementRef
} from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
    FormControl,
    FormsModule,
    Validators
} from '@angular/forms';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { MockElementRef } from '../../../../testing/mock-element-ref';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraDoubleInputComponent } from './terra-double-input.component';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { By } from '@angular/platform-browser';

describe('TerraDoubleInputComponent', () =>
{
    let component:TerraDoubleInputComponent;
    let fixture:ComponentFixture<TerraDoubleInputComponent>;
    let debugElement:DebugElement;
    let inputElement:HTMLInputElement;
    const testValue:number = 3.2;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraDoubleInputComponent,
                TerraButtonComponent,
                TerraLabelTooltipDirective
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                {
                    provide:  ElementRef,
                    useClass: MockElementRef
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraDoubleInputComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('input'));
        inputElement = debugElement.nativeElement;

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('component should be invalid after validating the input with wrong regex', () =>
    {
        const formControl:FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.IBAN_BIC)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBe(false);
    });

    it('component should be valid after validating the input with correct regex', () =>
    {
        const formControl:FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.DOUBLE)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBe(true);
    });

    it('inputs should be initialized correctly', () =>
    {
        expect(component.regex).toEqual(TerraRegex.getDouble(component.inputDecimalCount));
        expect(component.inputIsPriceInput).toBe(false);
        expect(component.inputDecimalCount).toEqual(2);
    });

    it('component should have price-input css if input is given', () =>
    {
        component.inputIsPriceInput = true;

        expect(debugElement.classes.hasOwnProperty('price-input')).toBeTruthy();
    });

    it('should be true if active element is the inputElement', () =>
    {
        inputElement.onfocus = ():void =>
        {
            expect(document.activeElement).toEqual(inputElement);
        };

        component.focusNativeInput();
    });
});
