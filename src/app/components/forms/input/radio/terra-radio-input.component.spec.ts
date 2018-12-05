import { TerraRadioInputComponent } from './terra-radio-input.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraRadioGroupComponent } from './terra-radio-group.component';
import { By } from '@angular/platform-browser';

fdescribe(`TerraRadioInputComponent:`, () =>
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
        expect(component.disabled).toBe(false);
        expect(component.label).toBeUndefined();
        expect(component.value).toBeUndefined();
    });

    describe(``, () =>
    {
        let inputElement:HTMLInputElement;
        beforeEach(() =>
        {
            inputElement = fixture.debugElement.query(By.css('input[type="radio"]')).nativeElement;
        });

        it(`should set disabled attribute of the <input>-element depending on #disabled`, () =>
        {
            expect(inputElement.disabled).toBe(false);

            component.disabled = true;
            fixture.detectChanges();

            expect(inputElement.disabled).toBe(true);
        });

        it(`should set value attribute of the <input>-element depending on #value`, () =>
        {
            const testValue:string = 'Test value';

            expect(inputElement.value).not.toBe(testValue);

            component.value = testValue;
            fixture.detectChanges();

            expect(inputElement.value).toBe(testValue);
        });

        it(`should set name attribute of the <input>-element depending on the group's #name property`, () =>
        {
            expect(inputElement.name).toBe('');

            const name:string = 'Test name';
            radioGroupComponent.name = name;
            fixture.detectChanges();

            expect(inputElement.name).toBe(name);
        });
    });

});
