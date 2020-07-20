import {
    DebugElement,
    Directive,
    Input
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from 'angular-l10n';
import { TerraTimePickerComponent } from './terra-time-picker.component';
import { TerraSelectBoxComponent } from '../../select-box/terra-select-box.component';
import { TerraSelectBoxValueInterface } from '../../select-box/data/terra-select-box.interface';

@Directive({
    selector: '[tcTooltip]'
})
class MockTooltipDirective
{
    @Input('tcTooltip') public tooltip:string;
    @Input() public placement:string;
    @Input() public onlyEllipsisTooltip:boolean;
}

describe('TerraTimePickerComponent:', () =>
{
    let fixture:ComponentFixture<TerraTimePickerComponent>;
    let component:TerraTimePickerComponent;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                TranslationModule.forRoot({})
            ],
            declarations: [
                TerraTimePickerComponent,
                TerraSelectBoxComponent,
                MockTooltipDirective
            ]
        });
        fixture = TestBed.createComponent(TerraTimePickerComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize possible values during construction', () =>
    {
        expect(component.valuesHours.length).toBe(24);
        expect(component.valuesHours.every((val:TerraSelectBoxValueInterface, index:number) => val.value === index)).toBe(true);
        expect(component.valuesMinutes.length).toBe(60);
        expect(component.valuesMinutes.every((val:TerraSelectBoxValueInterface, index:number) => val.value === index)).toBe(true);
    });

    it('should pass possible values to the select boxes', () =>
    {
        const selectDEs:Array<DebugElement> = fixture.debugElement.queryAll(By.directive(TerraSelectBoxComponent));
        const hourSelect:TerraSelectBoxComponent = selectDEs[0].componentInstance;
        const minutesSelect:TerraSelectBoxComponent = selectDEs[1].componentInstance;
        expect(hourSelect.inputListBoxValues).toBe(component.valuesHours);
        expect(minutesSelect.inputListBoxValues).toBe(component.valuesMinutes);
    });

    it('should initialize its value with the current time', () =>
    {
        const now:Date = new Date();
        expect(component._hours).toBe(now.getHours());
        expect(component._minutes).toBe(now.getMinutes());
    });

    it('should update the value on #writeValue', () =>
    {
        const newValue:Date = new Date();
        component.writeValue(newValue);
        expect(component._hours).toBe(newValue.getHours());
        expect(component._minutes).toBe(newValue.getMinutes());
    });

    it('should call registered onChangeCallback when the value has changed', () =>
    {
        const spy:jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(spy);
        component._hours = 2;
        expect(spy).toHaveBeenCalled();
    });

    it('should call registered onTouchedCallback when the value has changed', () =>
    {
        const spy:jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        component._minutes = 15;
        expect(spy).toHaveBeenCalled();
    });

    it('should set the hours when the user selects a different hours', () =>
    {
        const hourSelect:TerraSelectBoxComponent = fixture.debugElement.queryAll(By.directive(TerraSelectBoxComponent))[0].componentInstance;
        const selectedHour:TerraSelectBoxValueInterface = component.valuesHours[1];
        hourSelect._select(selectedHour);
        expect(component._hours).toEqual(selectedHour.value);
    });

    it('should set the minutes when the user selects a different minute', () =>
    {
        const minuteSelect:TerraSelectBoxComponent = fixture.debugElement.queryAll(By.directive(TerraSelectBoxComponent))[1].componentInstance;
        const selectedMinute:TerraSelectBoxValueInterface = component.valuesMinutes[1];
        minuteSelect._select(selectedMinute);
        expect(component._minutes).toEqual(selectedMinute.value);
    });

    it('should return 0 hours when the value is null or undefined', () =>
    {
        component.writeValue(null);
        expect(component._hours).toBe(0);
        component.writeValue(undefined);
        expect(component._hours).toBe(0);
    });

    it('should return 0 minutes when the value is null or undefined', () =>
    {
        component.writeValue(null);
        expect(component._minutes).toBe(0);
        component.writeValue(undefined);
        expect(component._hours).toBe(0);
    });

});
