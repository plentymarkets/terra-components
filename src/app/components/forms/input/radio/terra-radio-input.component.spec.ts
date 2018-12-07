import { TerraRadioInputComponent } from './terra-radio-input.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraRadioGroupComponent } from './terra-radio-group.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe(`TerraRadioInputComponent:`, () =>
{
    let fixture:ComponentFixture<TerraRadioInputComponent>;
    let component:TerraRadioInputComponent;
    let radioGroupComponent:TerraRadioGroupComponent;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraRadioInputComponent],
            providers:    [{
                provide:  TerraRadioGroupComponent,
                useValue: {value: 1}
            }]
        });
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraRadioInputComponent);
        component = fixture.componentInstance;
        radioGroupComponent = TestBed.get(TerraRadioGroupComponent);
    });

    it(`should create`, () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialize its inputs`, () =>
    {
        expect(component.label).toBeUndefined();
        expect(component.value).toBeUndefined();
        expect(component.disabled).toBe(false);
    });

    it(`should display the given #label text in the <label>`, () =>
    {
        let labelElement:HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
        expect(labelElement.innerText).toBe('');

        const label:string = 'label';
        component.label = label;
        fixture.detectChanges();

        expect(labelElement.innerText).toBe(label);
    });

    describe(``, () =>
    {
        let inputDebugElement:DebugElement;
        let inputElement:HTMLInputElement;
        beforeEach(() =>
        {
            inputDebugElement = fixture.debugElement.query(By.css('input[type="radio"]'));
            inputElement = inputDebugElement.nativeElement;
        });

        it(`should set [disabled] attribute of the <input> depending on #disabled`, () =>
        {
            expect(inputElement.disabled).toBe(false);

            component.disabled = true;
            fixture.detectChanges();

            expect(inputElement.disabled).toBe(true);
        });

        it(`should set [value] attribute of the <input> depending on #value`, () =>
        {
            const testValue:string = 'Test value';

            expect(inputElement.value).not.toBe(testValue);

            component.value = testValue;
            fixture.detectChanges();

            expect(inputElement.value).toBe(testValue);
        });

        it(`should set [name] attribute of the <input> depending on the group's #name property`, () =>
        {
            expect(inputElement.name).toBe('');

            const name:string = 'Test name';
            radioGroupComponent.name = name;
            fixture.detectChanges();

            expect(inputElement.name).toBe(name);
        });

        it(`should set [checked] attribute of the <input> if the group's #value equals #value`, () =>
        {
            expect(inputElement.checked).toBe(false);

            const value:string = 'Test value';
            component.value = value;
            radioGroupComponent.value = value;
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);

            radioGroupComponent.value = 'Another value';
            fixture.detectChanges();

            expect(inputElement.checked).toBe(false);
        });

        it(`should assign #value to the group's #value if the <input>'s (change) event is triggered`, () =>
        {
            const value:string = 'Test value';
            component.value = value;
            expect(radioGroupComponent.value).not.toBe(value);

            inputDebugElement.triggerEventHandler('change', {});

            expect(radioGroupComponent.value).toBe(value);
        });
    });
});
