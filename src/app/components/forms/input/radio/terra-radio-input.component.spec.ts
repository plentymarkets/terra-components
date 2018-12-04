import { TerraRadioInputComponent } from './terra-radio-input.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraRadioGroupComponent } from './terra-radio-group.component';
import { By } from '@angular/platform-browser';

fdescribe(`TerraRadioInputComponent`, () =>
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

    it(`should set disabled attribute of the <input>-element depending on #disabled`, () =>
    {
        let inputElement:HTMLInputElement = fixture.debugElement.query(By.css('input[type="radio"]')).nativeElement;
        expect(inputElement.disabled).toBe(false);

        component.disabled = true;

        fixture.detectChanges();

        expect(inputElement.disabled).toBe(true);
    });
});
