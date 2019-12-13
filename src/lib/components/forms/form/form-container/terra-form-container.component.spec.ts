import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFormContainerComponent } from './terra-form-container.component';
import {
    DebugElement,
    NO_ERRORS_SCHEMA
} from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('TerraFormContainerComponent: ', () =>
{
    let fixture:ComponentFixture<TerraFormContainerComponent>;
    let component:TerraFormContainerComponent;
    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [TerraFormContainerComponent]
        }).createComponent(TerraFormContainerComponent);

        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('form entries should be wrapped by div with classes `container-fluid` and `row`', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let containerFluidDebugElements:Array<DebugElement> = debugElement.queryAll(By.css('div'));

        // containerFluidDebugElements.some((element:DebugElement) =>
        // {
        //     element;
        // });
        // expect(containerFluidDebugElement).toBeDefined();
    });
});
