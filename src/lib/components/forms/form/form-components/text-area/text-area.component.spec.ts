import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, DebugElement, SimpleChange } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TextAreaComponent } from './text-area.component';

fdescribe('TextAreaComponent', () => {
    let component: TextAreaComponent;
    let fixture: ComponentFixture<TextAreaComponent>;
    let debugElement: DebugElement;
    let inputElement: HTMLTextAreaElement;
    const testString: string = 'test';

    beforeAll(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TextAreaComponent],
            imports: [FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, CommonModule]
        });
    });

    beforeAll(() => {
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('textarea'));
        inputElement = debugElement.nativeElement;

        fixture.autoDetectChanges(true);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should set name as mat-label', () => {
        component.name = 'foo';
        fixture.detectChanges();

        let matLabel: HTMLElement = fixture.debugElement.query(By.css('mat-label')).nativeElement;

        expect(matLabel.innerText).toBe('foo');
    });

    it('should have maxRows default value of 4', () => {
        expect(inputElement.rows).toBe(4);
    });

    xit('should set maxRows according to input but with at least 4', fakeAsync(() => {
        component.ngOnChanges({ maxRows: new SimpleChange(4, 2, false) });
        fixture.detectChanges();
        expect(inputElement.rows).toBe(4);

        component.ngOnChanges({ maxRows: new SimpleChange(4, 6, false) });
        fixture.detectChanges();
        flush();
        expect(inputElement.rows).toBe(6);
    }));

    it('should set resize style according to hastFixedHeight', () => {
        expect(inputElement.style.resize).toBe('vertical');

        // component.hasFixedHeight = true;
        component.ngOnChanges({ hasFixedHeight: new SimpleChange(false, true, false) });
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => expect(inputElement.style.resize).toBe('none'));
    });
});
