import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFormContainerComponent } from './terra-form-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    TerraFormScope,
    TerraTextInputComponent
} from '../../../..';

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

    beforeEach(() =>
    {
        // initialisation of the component's inputs
        component.inputScope = new TerraFormScope();

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
