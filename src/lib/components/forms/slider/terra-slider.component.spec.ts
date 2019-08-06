import { TerraSliderComponent } from './terra-slider.component';
import {
    async,
    ComponentFixture,
    fakeAsync,
    flush,
    TestBed
} from '@angular/core/testing';
import { TerraDraggableDirective } from '../../interactables/draggable.directive';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import Spy = jasmine.Spy;

describe(`TerraSliderComponent:`, () =>
{
    let component:TerraSliderComponent;
    let fixture:ComponentFixture<TerraSliderComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraDraggableDirective,
                TerraSliderComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraSliderComponent);
        component = fixture.componentInstance;
    });

    it(`should create`, () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialize its inputs and outputs`, () =>
    {
        expect(component.inputValue).toBeUndefined();
        expect(component.inputValueChange).toBeDefined();
        expect(component.inputName).toBeUndefined();
        expect(component.inputInterval).toBe(0);
        expect(component.inputMin).toBe(0);
        expect(component.inputMax).toBe(1);
        expect(component.inputPrecision).toBeNull();
        expect(component.inputIsDisabled).toBe(false);
        expect(component.inputShowMinMax).toBe(false);
        expect(component.inputShowTicks).toBe(false);
    });

    describe(`with 2-way-data-binding via ngModel or #inputValue`, () =>
    {
        let sliderWidth:number;
        beforeEach(() =>
        {
            let sliderBar:HTMLDivElement = fixture.debugElement.query(By.css('.slider-bar')).nativeElement;
            sliderWidth = sliderBar.getBoundingClientRect().width;
        });

        it(`should update slider position (#handlePosition) when calling #writeValue`, () =>
        {
            component.writeValue(0.2);
            expect(component.handlePosition).toBe(sliderWidth * 0.2);

            component.writeValue(0.4);
            expect(component.handlePosition).toBe(sliderWidth * 0.4);
        });

        it(`should update slider position (#handlePosition) when updating #inputValue`, () =>
        {
            component.inputValue = 0.2;
            component.ngOnChanges({inputValue: null});
            expect(component.handlePosition).toBe(sliderWidth * 0.2);

            component.inputValue = 0.7;
            component.ngOnChanges({inputValue: null});
            expect(component.handlePosition).toBe(sliderWidth * 0.7);
        });

        it(`should emit on #inputValueChanged and call registered #changeCallback when setting the value of #handlePosition`, () =>
        {
            let emittedValue:number = 0;
            let spy:Spy = jasmine.createSpy('spy');
            component.registerOnChange(spy);
            component.inputValueChange.subscribe((value:number) => emittedValue = value);

            const testValue:number = 0.6;
            component.handlePosition = sliderWidth * testValue;

            expect(spy).toHaveBeenCalledWith(testValue);
            expect(emittedValue).toBe(testValue);
        });
    });

    describe(`with form navigation`, () =>
    {
        let debugElement:DebugElement;
        let sliderElement:DebugElement;
        let sliderHandle:HTMLElement;

        beforeEach(() =>
        {
            debugElement = fixture.debugElement;
            sliderElement = debugElement.query(By.css('div.slider-handle'));
            sliderHandle = sliderElement.nativeElement;
        });

        it(`should focus slider by navigating with tab`, fakeAsync(() =>
        {
            sliderHandle.focus();
            flush();
            expect(document.activeElement).toEqual(sliderHandle);
        }));
    });
});
