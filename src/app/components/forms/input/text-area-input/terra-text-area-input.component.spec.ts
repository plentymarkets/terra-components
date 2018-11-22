import {
    DebugElement,
    ElementRef,
    SimpleChange
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraTextAreaInputComponent } from './terra-text-area-input.component';
import { TerraRegex } from '../../../../..';
import { By } from '@angular/platform-browser';
import Spy = jasmine.Spy;
import { MockElementRef } from '../../../../testing/mock-element-ref';

describe('TerraTextAreaInputComponent', () =>
{
    let component:TerraTextAreaInputComponent;
    let fixture:ComponentFixture<TerraTextAreaInputComponent>;
    let debugElement:DebugElement;
    let inputElement:HTMLInputElement;
    const testString:string = 'test';

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

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize inputs correctly', () =>
    {
        expect(component.regex).toEqual(TerraRegex.MIXED);
        expect(component.inputHasFixedHeight).toBe(false);
        expect(component.inputMaxRows).toEqual(4);
    });

    it('should limit #inputMaxRows to at least 4 rows', () =>
    {
        expect(component.inputMaxRows).toEqual(4);

        component.ngOnChanges({inputMaxRows: new SimpleChange(4, 3, false)});

        fixture.detectChanges();

        expect(component.inputMaxRows).toEqual(4);
    });

    it('should update #inputHasFixedHeight accordingly when #ngOnChanges is called', () =>
    {
        expect(component.inputHasFixedHeight).toEqual(false);

        component.ngOnChanges({inputHasFixedHeight: new SimpleChange(false, true, false)});

        fixture.detectChanges();

        expect(component.inputHasFixedHeight).toEqual(true);
    });

    it('should set resizable attribute of the input element dependent on #inputHasFixedHeight', () =>
    {
        component.inputHasFixedHeight = false;
        fixture.detectChanges();
        expect(debugElement.classes['resizable']).not.toBe(component.inputHasFixedHeight);

        component.inputHasFixedHeight = true;
        fixture.detectChanges();
        expect(debugElement.classes['resizable']).not.toBe(component.inputHasFixedHeight);
    });

    it('should focus the input element if #focusNativInput is called', () =>
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
