import { DebugElement } from '@angular/core';
import { Time } from '@angular/common';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import {
    MatSelect,
    MatSelectModule
} from '@angular/material/select';
import { TranslationModule } from 'angular-l10n';
import { TerraTimePickerComponent } from './terra-time-picker.component';

describe('TerraTimePickerComponent:', () =>
{
    let fixture:ComponentFixture<TerraTimePickerComponent>;
    let component:TerraTimePickerComponent;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [
                MatSelectModule,
                NoopAnimationsModule,
                ReactiveFormsModule,
                TranslationModule.forRoot({})
            ],
            declarations: [
                TerraTimePickerComponent
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
        expect(component._hours.length).toBe(24);
        expect(component._hours.every((val:number, index:number) => val === index)).toBe(true);
        expect(component._minutes.length).toBe(60);
        expect(component._minutes.every((val:number, index:number) => val === index)).toBe(true);
    });

    it('should pass possible values to the select boxes', () =>
    {
        const selectDEs:Array<DebugElement> = fixture.debugElement.queryAll(By.directive(MatSelect));
        const hourSelect:MatSelect = selectDEs[0].componentInstance;
        const minutesSelect:MatSelect = selectDEs[1].componentInstance;
        expect(hourSelect.options.length).toBe(component._hours.length);
        expect(minutesSelect.options.length).toBe(component._minutes.length);
    });

    it('should update the value on #writeValue', () =>
    {
        const now:Date = new Date();
        const hours:number = now.getHours();
        const minutes:number = now.getMinutes();
        component.writeValue({ hours: hours, minutes: minutes });
        expect(component._form.value.hours).toBe(hours);
        expect(component._form.value.minutes).toBe(minutes);
    });

    it('should call registered onChangeCallback when the value has changed', () =>
    {
        const spy:jasmine.Spy = jasmine.createSpy('onChangeCallback');
        component.registerOnChange(spy);
        const newTime:Time = { hours: 2, minutes: 15 };
        component._form.patchValue(newTime);
        expect(spy).toHaveBeenCalledWith(newTime);
    });

    it('should call registered onTouchedCallback when one of the selects blurs', () =>
    {
        pending();
    });

    it('should update value when the user selects a different hour', () =>
    {
        const hourSelect:MatSelect = fixture.debugElement.queryAll(By.directive(MatSelect))[0].componentInstance;
        const option:MatOption = hourSelect.options.last;
        option.select();
        expect(component._form.value.hours).toEqual(option.value);
    });

    it('should update value when the user selects a different minute', () =>
    {
        const minuteSelect:MatSelect = fixture.debugElement.queryAll(By.directive(MatSelect))[1].componentInstance;
        const option:MatOption = minuteSelect.options.last;
        option.select();
        expect(component._form.value.minutes).toEqual(option.value);
    });

    it('should return 0 hours when the value is null or undefined', () =>
    {
        component.writeValue(null);
        expect(component._form.value.hours).toBe(null);
        component.writeValue(undefined);
        expect(component._form.value.hours).toBe(null);
    });

    it('should return 0 minutes when the value is null or undefined', () =>
    {
        component.writeValue(null);
        expect(component._form.value.minutes).toBe(null);
        component.writeValue(undefined);
        expect(component._form.value.minutes).toBe(null);
    });

});
