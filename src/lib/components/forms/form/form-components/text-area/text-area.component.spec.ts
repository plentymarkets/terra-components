import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TerraPlacementEnum } from '../../../../../helpers';
import { MockTooltipDirective } from '../../../../../testing/mock-tooltip.directive';
import { TextAreaComponent } from './text-area.component';

// tslint:disable-next-line: max-function-line-count
describe('TextAreaComponent', () => {
    let component: TextAreaComponent;
    let fixture: ComponentFixture<TextAreaComponent>;
    let loader: HarnessLoader;
    let input: MatInputHarness;
    let host: TestElement;

    const testString: string = 'foo';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockTooltipDirective, TextAreaComponent],
            imports: [FormsModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule]
        }).compileComponents();
        fixture = TestBed.createComponent(TextAreaComponent);
        component = fixture.componentInstance;

        loader = TestbedHarnessEnvironment.loader(fixture);
        input = await loader.getHarness(MatInputHarness);
        host = await input.host();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(input).toBeTruthy();
    });

    it('should have type textarea', async () => {
        expect(await input.getType()).toBe('textarea');
        expect(await host.matchesSelector('textarea')).toBe(true);
    });

    it('should set name as mat-label', async () => {
        component.name = testString;
        fixture.detectChanges();
        const formField: MatFormFieldHarness = await loader.getHarness(MatFormFieldHarness);

        expect(await formField.getLabel()).toBe(testString);
    });

    it('should set required state according to #isRequired', async () => {
        expect(await input.isRequired()).toBe(false);
        component.isRequired = true;
        fixture.detectChanges();
        expect(await input.isRequired()).toBe(true);
    });

    it('should set disabled state according to #isDisabled', async () => {
        expect(await input.isDisabled()).toBe(false);
        component.isDisabled = true;
        fixture.detectChanges();
        expect(await input.isDisabled()).toBe(true);
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

        it('should set tooltiptext according to #tooltipText', () => {
            expect(tooltTip.tcTooltip).toBeFalsy();
            component.tooltipText = testString;
            fixture.detectChanges();
            expect(tooltTip.tcTooltip).toBe(testString);
        });
    });

    it('should have a default value of 4 for maxRows', async () => {
        expect(+(await host.getAttribute('rows'))).toBe(4);
    });

    it('should set maxRows according to #maxRows but with at least 4', async () => {
        component.ngOnChanges({ maxRows: new SimpleChange(4, 2, false) });
        fixture.detectChanges();
        expect(+(await host.getAttribute('rows'))).toBe(4);

        component.ngOnChanges({ maxRows: new SimpleChange(4, 6, false) });
        fixture.detectChanges();
        expect(+(await host.getAttribute('rows'))).toBe(6);
    });

    it('should set resize style according to #hastFixedHeight', async () => {
        expect(await host.getCssValue('resize')).toBe('vertical');

        component.ngOnChanges({ hasFixedHeight: new SimpleChange(false, true, false) });
        fixture.detectChanges();
        expect(await host.getCssValue('resize')).toBe('none');
    });

    it('should set maxlength according to #maxLength', async () => {
        expect(+(await host.getAttribute('maxLength'))).toBe(0);
        component.maxLength = 10;
        fixture.detectChanges();
        expect(+(await host.getAttribute('maxLength'))).toBe(10);
    });
});
