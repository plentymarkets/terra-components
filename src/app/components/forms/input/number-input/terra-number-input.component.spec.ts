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
import { TerraNumberInputComponent } from './terra-number-input.component';
import { By } from '@angular/platform-browser';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';

describe('TerraNumberInputComponent', () =>
{
    let component:TerraNumberInputComponent;
    let fixture:ComponentFixture<TerraNumberInputComponent>;
    let debugElement:DebugElement;
    let inputElement:HTMLInputElement;
    let testValue:number = 3;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraNumberInputComponent,
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
        fixture = TestBed.createComponent(TerraNumberInputComponent);
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
        const formControl:FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.COLOR_HEX)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBeFalsy();
    });

    it('component should be valid after validating the input with correct regex', () =>
    {
        const formControl:FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.NUMERIC)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBeTruthy();
    });

    it('should be true if active element is the inputElement', () =>
    {
        component.focusNativeInput();

        setTimeout(() =>
        {
            expect(document.activeElement).toEqual(inputElement);
        });
    });
});
