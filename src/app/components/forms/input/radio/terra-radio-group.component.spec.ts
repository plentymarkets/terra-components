import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraRadioInputComponent } from './terra-radio-input.component';
import { TerraRadioGroupComponent } from './terra-radio-group.component';
import { TerraRadioGroupComponentExample } from './example/terra-radio-group.component.example';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import Spy = jasmine.Spy;


@Component({
    template: `<terra-radio-group name="radio">
        <terra-radio-input [label]="'Option 1'" [value]="1"></terra-radio-input>
        <terra-radio-input [label]="'Option 2'" [value]="2"></terra-radio-input>
    </terra-radio-group>`
})
class RadioGroupTestComponent {}


fdescribe(`TerraRadioGroupComponent:`, () =>
{
    let component:RadioGroupTestComponent;
    let fixture:ComponentFixture<RadioGroupTestComponent>;
    let radioGroupComponent:TerraRadioGroupComponent;
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraRadioInputComponent, TerraRadioGroupComponent, RadioGroupTestComponent],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(RadioGroupTestComponent);
        component = fixture.componentInstance;
    });

    describe(`raw`, () =>
    {
        beforeEach(() =>
        {
            radioGroupComponent = TestBed.createComponent(TerraRadioGroupComponent).componentInstance;
        });

        it(`should create`, () =>
        {
            expect(component).toBeTruthy();
            expect(radioGroupComponent).toBeTruthy();
        });

        it(`should initialize its inputs`, () =>
        {
            expect(radioGroupComponent.name).toBeUndefined();
            expect(radioGroupComponent.legend).toBeUndefined();
        });

        it(`setting the #value should update the #value`, () =>
        {
            const testValue:any = {test: true};
            radioGroupComponent.value = testValue;
            expect(radioGroupComponent.value).toBe(testValue);
        });

        it(`#writeValue should update the #value of the radio group`, () =>
        {
            const testValue:any = 'check';
            radioGroupComponent.writeValue(testValue);
            expect(radioGroupComponent.value).toBe(testValue);
        });

        it(`should call the registered #changeCallback when setting the #value`, () =>
        {
            const testValue:any = 1;
            let spy:Spy = jasmine.createSpy('spy');
            radioGroupComponent.registerOnChange(spy);
            radioGroupComponent.value = testValue;
            expect(spy).toHaveBeenCalledWith(testValue);
        });
    });

    describe(`within a test host with radio inputs`, () =>
    {
        beforeEach(() =>
        {
            radioGroupComponent = fixture.debugElement.query(By.css('terra-radio-group')).componentInstance;
            fixture.detectChanges();
        });

        it(`should update #checked attribute of the corresponding input if #value is updated`, () =>
        {
            expect(radioGroupComponent.value).toBeUndefined();
            let inputElement:HTMLInputElement = fixture.debugElement.queryAll(By.css('input[type="radio"]'))[1].nativeElement;
            expect(inputElement.checked).toBe(false);

            radioGroupComponent.value = +inputElement.value;
            fixture.detectChanges();
            expect(inputElement.checked).toBe(true);
        });


    });
});
