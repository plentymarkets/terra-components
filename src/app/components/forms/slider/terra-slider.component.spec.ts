import { TerraSliderComponent } from './terra-slider.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraDraggableDirective } from '../../interactables/draggable.directive';

fdescribe(`TerraSliderComponent`, () =>
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
});
