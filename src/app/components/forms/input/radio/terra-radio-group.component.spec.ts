import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraRadioInputComponent } from './terra-radio-input.component';
import { TerraRadioGroupComponent } from './terra-radio-group.component';
import Spy = jasmine.Spy;
import { TerraRadioGroupComponentExample } from './example/terra-radio-group.component.example';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

fdescribe(`TerraRadioGroupComponent:`, () =>
{
    let component:TerraRadioGroupComponentExample;
    let fixture:ComponentFixture<TerraRadioGroupComponentExample>;
    let radioGroupComponent:TerraRadioGroupComponent;
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraRadioInputComponent, TerraRadioGroupComponent, TerraRadioGroupComponentExample],
            imports: [FormsModule]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraRadioGroupComponentExample);
        component = fixture.componentInstance;
        radioGroupComponent = fixture.debugElement.query(By.css('terra-radio-group')).componentInstance;
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
