import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraRadioInputComponent } from './terra-radio-input.component';
import { TerraRadioGroupComponent } from './terra-radio-group.component';
import Spy = jasmine.Spy;

fdescribe(`TerraRadioGroupComponent:`, () =>
{
    let component:TerraRadioGroupComponent;
    let fixture:ComponentFixture<TerraRadioGroupComponent>;
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraRadioInputComponent, TerraRadioGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraRadioGroupComponent);
        component = fixture.componentInstance;
    });

    it(`should create`, () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialize its inputs`, () =>
    {
        expect(component.name).toBeUndefined();
        expect(component.legend).toBeUndefined();
    });

    it(`#writeValue should update the #value of the radio group`, () =>
    {
        const testValue:any = 'check';
        component.writeValue(testValue);
        expect(component.value).toBe(testValue);
    });

    it(`should call the registered #changeCallback when setting the #value`, () =>
    {
        const testValue:any = 'check';
        let spy:Spy = jasmine.createSpy('spy');
        component.registerOnChange(spy);
        component.value = testValue;
        expect(spy).toHaveBeenCalledWith(testValue);
    });
});
