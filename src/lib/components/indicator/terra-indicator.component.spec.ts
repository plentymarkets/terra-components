import { TerraIndicatorComponent } from './terra-indicator.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TerraIndicatorLabelTypeEnum } from '../../helpers/enums/indicator-label-type.enum';

describe('TerraIndicatorComponent:', () => {
    let component: TerraIndicatorComponent;
    let fixture: ComponentFixture<TerraIndicatorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TerraIndicatorComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraIndicatorComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should #inputType be defined', () => {
        expect(component.inputType).toBeDefined();
        expect(component.inputType).toEqual(TerraIndicatorLabelTypeEnum.default);
    });

    it('should #inputType and #inputLabel be set properly', () => {
        let expectedLabel: string = 'attention';
        component.inputLabel = expectedLabel;
        component.inputType = TerraIndicatorLabelTypeEnum.warning;

        fixture.detectChanges();

        let debugElement: DebugElement = fixture.debugElement;
        let indicatorDebugElement: DebugElement = debugElement.query(By.css('span.label'));

        expect(indicatorDebugElement.classes['label-warning']).toBe(true);

        let spanElement: HTMLSpanElement = indicatorDebugElement.nativeElement;

        expect(spanElement.innerHTML).toBe(expectedLabel);
    });
});
