import { DebugElement, ElementRef, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraTextAreaInputComponent } from './terra-text-area-input.component';
import { By } from '@angular/platform-browser';
import { MockElementRef } from '../../../../testing/mock-element-ref';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import Spy = jasmine.Spy;
import { mockL10nConfig } from 'src/lib/testing/mock-l10n-config';

describe('TerraTextAreaInputComponent', () => {
    let component: TerraTextAreaInputComponent;
    let fixture: ComponentFixture<TerraTextAreaInputComponent>;
    let debugElement: DebugElement;
    let inputElement: HTMLInputElement;
    const testString: string = 'test';
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TooltipDirective, TerraTextAreaInputComponent],
            imports: [FormsModule, L10nTranslationModule.forRoot(mockL10nConfig)],
            providers: [
                {
                    provide: Router,
                    useValue: router
                },
                {
                    provide: ElementRef,
                    useClass: MockElementRef
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraTextAreaInputComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('textarea'));
        inputElement = debugElement.nativeElement;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize inputs correctly', () => {
        expect(component.regex).toEqual(TerraRegex.MIXED);
        expect(component.inputHasFixedHeight).toBe(false);
        expect(component.inputMaxRows).toEqual(4);
    });

    it('should limit #inputMaxRows to at least 4 rows', () => {
        expect(component.inputMaxRows).toEqual(4);

        component.ngOnChanges({ inputMaxRows: new SimpleChange(4, 3, false) });

        fixture.detectChanges();

        expect(component.inputMaxRows).toEqual(4);
    });

    it('should update #inputHasFixedHeight accordingly when #ngOnChanges is called', () => {
        expect(component.inputHasFixedHeight).toEqual(false);

        component.ngOnChanges({ inputHasFixedHeight: new SimpleChange(false, true, false) });

        fixture.detectChanges();

        expect(component.inputHasFixedHeight).toEqual(true);
    });

    it('should set resizable attribute of the input element dependent on #inputHasFixedHeight', () => {
        component.inputHasFixedHeight = false;
        fixture.detectChanges();
        expect(debugElement.classes['resizable']).not.toBe(component.inputHasFixedHeight);

        component.inputHasFixedHeight = true;
        fixture.detectChanges();
        expect(debugElement.classes['resizable']).not.toBe(component.inputHasFixedHeight);
    });

    it('should focus the input element if #focusNativeInput is called', fakeAsync(() => {
        component.focusNativeInput();
        flush();

        expect(document.activeElement).toEqual(inputElement);
    }));

    it(`should select the text of the input if #selectNativeInput method is called`, fakeAsync(() => {
        let spy: Spy = spyOn(inputElement, 'select').and.callThrough();
        inputElement.value = testString;
        expect(inputElement.selectionStart).toEqual(inputElement.selectionEnd); // nothing selected

        component.selectNativeInput();
        flush();

        expect(inputElement.selectionStart).toEqual(0);
        expect(inputElement.selectionEnd).toEqual(testString.length);
        expect(spy).toHaveBeenCalled();
    }));
});
