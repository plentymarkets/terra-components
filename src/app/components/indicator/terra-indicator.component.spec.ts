import {
    TerraIndicatorComponent,
    TerraIndicatorLabelTypeEnum
} from './terra-indicator.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('Component: TerraIndicatorComponent', () =>
{
    let component:TerraIndicatorComponent;
    let fixture:ComponentFixture<TerraIndicatorComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraIndicatorComponent]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraIndicatorComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should inputType be defined', () =>
    {
        expect(component.inputType).toBeDefined();
        expect(component.inputType).toEqual(TerraIndicatorLabelTypeEnum.default);
    });

    it('should #inputType and #inputLabel be set properly', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let indicatorDebugElement:DebugElement = debugElement.query(By.css('span'));

        let expectedLabel:string = 'attention';
        component.inputLabel = expectedLabel;
        component.inputType = TerraIndicatorLabelTypeEnum.warning;

        fixture.detectChanges();

        expect(indicatorDebugElement.properties['className']).toEqual('label label-warning');
        expect(indicatorDebugElement.nativeElement.textContent.trim()).toBe(expectedLabel);
    });
});
