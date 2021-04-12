import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerraPlacementEnum } from '../../../../../helpers';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TextAreaComponent } from './text-area.component';

// tslint:disable-next-line: max-function-line-count
describe('TextAreaComponent', () => {
    let component: TextAreaComponent;
    let fixture: ComponentFixture<TextAreaComponent>;
    let inputElement: HTMLTextAreaElement;
    const testString: string = 'foo';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TextAreaComponent],
            imports: [FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
        });
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;
        inputElement = fixture.debugElement.query(By.css('textarea')).nativeElement;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set name as mat-label', () => {
        component.name = testString;
        fixture.detectChanges();

        let matLabel: HTMLElement = fixture.debugElement.query(By.css('mat-label')).nativeElement;

        expect(matLabel.innerText).toBe(testString);
    });

    it('should set required state accorind to #isRequired', () => {
        expect(inputElement.required).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();
        expect(inputElement.required).toBe(true);
    });

    it('should set disabled state accorind to #isDisabled', () => {
        expect(inputElement.disabled).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();
        expect(inputElement.disabled).toBe(true);
    });

    describe('', () => {
        let tooltTip: MockTooltipDirective;

        beforeEach(() => {
            tooltTip = fixture.debugElement
                .query(By.directive(MockTooltipDirective))
                .injector.get(MockTooltipDirective);
        });

        it('should set tooltip placement according to #tooltipPlacement', () => {
            expect(tooltTip.placement).toBe('top');
            component.tooltipPlacement = TerraPlacementEnum.RIGHT;
            fixture.detectChanges();
            expect(tooltTip.placement).toBe('right');
        });

        it('should set tooltiptext accoring to #tooltipText', () => {
            expect(tooltTip.tcTooltip).toBeFalsy();
            component.tooltipText = testString;
            fixture.detectChanges();
            expect(tooltTip.tcTooltip).toBe(testString);
        });
    });

    it('should have a default value of 4 for maxRows', () => {
        expect(inputElement.rows).toBe(4);
    });

    it('should set maxRows according to #maxRows but with at least 4', () => {
        component.ngOnChanges({ maxRows: new SimpleChange(4, 2, false) });
        fixture.detectChanges();
        expect(inputElement.rows).toBe(4);

        component.ngOnChanges({ maxRows: new SimpleChange(4, 6, false) });
        fixture.detectChanges();
        expect(inputElement.rows).toBe(6);
    });

    it('should set resize style according to #hastFixedHeight', () => {
        expect(inputElement.style.resize).toBe('vertical');

        component.ngOnChanges({ hasFixedHeight: new SimpleChange(false, true, false) });
        fixture.detectChanges();
        expect(inputElement.style.resize).toBe('none');
    });

    it('should set maxlength according to #maxlength', () => {
        expect(inputElement.maxLength).toBe(-1);
        component.maxLength = 10;
        fixture.detectChanges();
        expect(inputElement.maxLength).toBe(10);
    });
});
