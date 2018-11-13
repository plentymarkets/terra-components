import { ElementRef } from '@angular/core';
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
import {
    TerraButtonComponent,
    TerraRegex
} from '../../../../..';

describe('TerraDoubleInputComponent', () =>
{
    let component:TerraDoubleInputComponent;
    let fixture:ComponentFixture<TerraDoubleInputComponent>;
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

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should be invalid', () =>
    {
        component.value = 'Test';
        expect(component.value).not.toEqual(jasmine.any(Number));
    });

    it('should be valid', () =>
    {
        const formControl:FormControl = new FormControl(testValue, [Validators.pattern(TerraRegex.DOUBLE)]);

        component.value = testValue;
        component.validate(formControl);

        expect(component.isValid).toBeTruthy();
    });

    it('should be true if greater than 0', () =>
    {
        component.inputDecimalCount = 1;
        expect(component.inputDecimalCount).toBeGreaterThan(0);
    });

    it('should be false as default', () =>
    {
        expect(component.inputIsPriceInput).toBe(false);
    });

    it('should be price input if true is set', () =>
    {
        component.inputIsPriceInput = true;
        expect(component.inputIsPriceInput).toBe(true);
    });

    fit('should be true if focusNativeInput is called', (done:any) =>
    {
        let doubleInputElement:HTMLInputElement = fixture.nativeElement;
        let inputElement:HTMLInputElement = doubleInputElement.querySelector('input');

        component.focusNativeInput().then(() =>
        {
            expect(document.activeElement).toEqual(inputElement);
            done();
        });
    });

    fit('should be true if selectNativeInput is called', (done:Function) =>
    {
        component.value = testValue;
        fixture.detectChanges();

        component.selectNativeInput().then((isSelected:boolean) =>
        {
            expect(isSelected).toBe(true);
            done();
        });
    });
});
