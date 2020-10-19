import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioInputComponent } from './radio-input.component';
import { RadioGroupComponent } from './radio-group.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, SimpleChange } from '@angular/core';
import Spy = jasmine.Spy;

@Component({
    template: ` <tc-radio-group name="radio">
        <tc-radio-input [label]="'Option 1'" [value]="1"></tc-radio-input>
        <tc-radio-input [label]="'Option 2'" [value]="2"></tc-radio-input>
    </tc-radio-group>`
})
class RadioGroupTestComponent {}

describe(`RadioGroupComponent:`, () => {
    let radioGroupComponent: RadioGroupComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RadioInputComponent, RadioGroupComponent, RadioGroupTestComponent]
        });
    });

    describe(`itself`, () => {
        let fixture: ComponentFixture<RadioGroupComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(RadioGroupComponent);
            radioGroupComponent = fixture.componentInstance;
        });

        it(`should create`, () => {
            expect(radioGroupComponent).toBeTruthy();
        });

        it(`should initialize its inputs`, () => {
            expect(radioGroupComponent.name).toBeUndefined();
            expect(radioGroupComponent.legend).toBeUndefined();
        });

        it(`should display given #legend text in the <legend>-element`, () => {
            let legendDebugElement: DebugElement = fixture.debugElement.query(By.css('legend'));
            expect(legendDebugElement).toBeFalsy();

            const legend: string = 'Legend';
            radioGroupComponent.legend = legend;
            fixture.detectChanges();

            legendDebugElement = fixture.debugElement.query(By.css('legend'));
            expect(legendDebugElement).toBeTruthy();

            let legendElement: HTMLLegendElement = legendDebugElement.nativeElement;

            expect(legendElement.innerText).toBe(legend);
        });

        it(`setting the #value should update the #value`, () => {
            const testValue: any = { test: true };
            radioGroupComponent.value = testValue;
            expect(radioGroupComponent.value).toBe(testValue);
        });

        it(`setting the #name as empty (or null) should have #id as value`, () => {
            radioGroupComponent.name = 'test';
            radioGroupComponent.ngOnChanges({ name: new SimpleChange(null, '', true) });
            fixture.detectChanges();

            expect(radioGroupComponent.name).toBe(radioGroupComponent['_id']);
        });

        it(`#writeValue should update the #value of the radio group`, () => {
            const testValue: any = 'check';
            radioGroupComponent.writeValue(testValue);
            expect(radioGroupComponent.value).toBe(testValue);
        });

        it(`should call the registered #changeCallback when setting the #value`, () => {
            const testValue: any = 1;
            let spy: Spy = jasmine.createSpy('spy');
            radioGroupComponent.registerOnChange(spy);
            radioGroupComponent.value = testValue;
            expect(spy).toHaveBeenCalledWith(testValue);
        });

        it(`#writeValue should not call a registered #changeCallback`, () => {
            let spy: Spy = jasmine.createSpy('spy');
            radioGroupComponent.registerOnChange(spy);
            radioGroupComponent.writeValue('test');
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });

    describe(`within a test host with radio inputs`, () => {
        let component: RadioGroupTestComponent;
        let fixture: ComponentFixture<RadioGroupTestComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(RadioGroupTestComponent);
            component = fixture.componentInstance;
            radioGroupComponent = fixture.debugElement.query(By.css('tc-radio-group')).componentInstance;
            fixture.detectChanges();
        });

        it(`should create the host component`, () => {
            expect(component).toBeTruthy();
        });

        it(`#value should be undefined initially`, () => {
            expect(radioGroupComponent.value).toBeUndefined();
        });

        it(`should update [checked] attribute of the corresponding input if #value is updated`, () => {
            let inputElement: HTMLInputElement = fixture.debugElement.queryAll(By.css('input[type="radio"]'))[1]
                .nativeElement;
            expect(inputElement.checked).toBe(false);

            radioGroupComponent.value = +inputElement.value;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
        });

        it(`should update the group's #value if a radio input is clicked`, () => {
            let inputElement0: HTMLInputElement = fixture.debugElement.queryAll(By.css('input[type="radio"]'))[0]
                .nativeElement;
            let inputElement1: HTMLInputElement = fixture.debugElement.queryAll(By.css('input[type="radio"]'))[1]
                .nativeElement;

            inputElement0.click();
            expect(radioGroupComponent.value).toBe(+inputElement0.value);

            inputElement1.click();
            expect(radioGroupComponent.value).toBe(+inputElement1.value);
        });
    });
});
