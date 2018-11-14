import {
    DebugElement,
    ElementRef,
    SimpleChange
} from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { TerraTextAreaInputComponent } from './terra-text-area-input.component';
import { TerraRegex } from '../../../../..';
import { By } from '@angular/platform-browser';
import Spy = jasmine.Spy;

describe('TerraTextAreaInputComponent', () =>
{
    let component:TerraTextAreaInputComponent;
    let fixture:ComponentFixture<TerraTextAreaInputComponent>;
    let debugElement:DebugElement;
    let inputElement:HTMLInputElement;
    let testString:string = 'test';

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTextAreaInputComponent,
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
        fixture = TestBed.createComponent(TerraTextAreaInputComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('textarea'));
        inputElement = debugElement.nativeElement;

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('inputs should be initialized correctly', () =>
    {
        expect(component.regex).toEqual(TerraRegex.MIXED);
        expect(component.inputHasFixedHeight).toBe(false);
        expect(component.inputMaxRows).toEqual(4);
    });

    it('should be true after firing ngOnChanges', () =>
    {
        expect(component.inputMaxRows).toEqual(4);

        component.ngOnChanges({inputMaxRows: new SimpleChange(4, 3, false)});

        fixture.detectChanges();

        expect(component.inputMaxRows).toEqual(4);
    });

    it('should be true after firing ngOnChanges', () =>
    {
        expect(component.inputHasFixedHeight).toEqual(false);

        component.ngOnChanges({inputHasFixedHeight: new SimpleChange(false, true, false)});

        fixture.detectChanges();

        expect(component.inputHasFixedHeight).toEqual(true);
    });

    it('class resizable should not be inputHasFixedHeight', () =>
    {
        let resizable:boolean = debugElement.classes.hasOwnProperty('resizable') && debugElement.classes['resizable'];

        expect(resizable).not.toBe(component.inputHasFixedHeight);
    });

    it('should be true if active element is the inputElement', () =>
    {
        inputElement.onfocus = ():void =>
        {
            expect(document.activeElement).toEqual(inputElement);
        };
        component.focusNativeInput();
    });

    it(`should select the text of the input if #selectNativeInput method is called`, () =>
    {
        let spy:Spy = spyOn(inputElement, 'select').and.callThrough();
        inputElement.value = testString;
        expect(inputElement.selectionStart).toEqual(inputElement.selectionEnd); // nothing selected
        inputElement.onselect = ():void =>
        {
            expect(inputElement.selectionStart).toEqual(0);
            expect(inputElement.selectionEnd).toEqual(testString.length);
            expect(spy).toHaveBeenCalled();
        };
        component.selectNativeInput();
    });
});
