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
        component = fixture.nativeElement;
    });

    it(`should create`, () =>
    {
        expect(component).toBeTruthy();
    });
});
