import {
    Directive,
    Input
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
                FormsModule,
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
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize possible values on init', () =>
    {
        expect(component.valuesHours).toEqual([]);
        expect(component.valuesMinutes).toEqual([]);
        component.ngOnInit();
        expect(component.valuesHours.length).toBe(24);
        expect(component.valuesMinutes.length).toBe(60);
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

    it('should call registerd onTouchedCallback when the value has changed', () =>
    {
        const spy:jasmine.Spy = jasmine.createSpy('onTouchedCallback');
        component.registerOnTouched(spy);
        component._minutes = 15;
        expect(spy).toHaveBeenCalled();
    });

    it('should set the hours when the user selects a different hours', () =>
    {
        fixture.detectChanges();
        const hourSelect:TerraSelectBoxComponent = fixture.debugElement.queryAll(By.directive(TerraSelectBoxComponent))[0].componentInstance;
        const selectedHour:TerraSelectBoxValueInterface = component.valuesHours[1];
        hourSelect._select(selectedHour);
        expect(component._hours).toEqual(selectedHour.value);
    });

    it('should set the minutes when the user selects a different minute', () =>
    {
        fixture.detectChanges();
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

    it('should not update the hours if value is null or undefined', () =>
    {
        component.writeValue(null);
        expect(component._hours).toBe(0);
        component._hours = 2;
        expect(component._hours).toBe(0);
    });

    it('should not update the minutes if value is null or undefined', () =>
    {
        component.writeValue(undefined);
        expect(component._minutes).toBe(0);
        component._minutes = 10;
        expect(component._minutes).toBe(0);
    });

});
