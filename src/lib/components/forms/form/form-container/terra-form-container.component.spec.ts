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
import { FormGroup } from '@angular/forms';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormScope } from '../model/terra-form-scope.data';

fdescribe('TerraFormContainerComponent: ', () =>
{
    let fixture:ComponentFixture<TerraFormContainerComponent>;
    let component:TerraFormContainerComponent;

    const formFields:{ [key:string]:TerraFormFieldInterface } = {
        control1: {
            type:         'text',
            defaultValue: 'one'
        },
        control2: {
            type:         'text',
            defaultValue: 'two'
        }
    };

    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
            schemas:      [NO_ERRORS_SCHEMA],
            declarations: [TerraFormContainerComponent]
        }).createComponent(TerraFormContainerComponent);

        component = fixture.componentInstance;
    });

    beforeEach(() =>
    {
        // initialisation of the component's mandatory inputs
        component.inputScope = new TerraFormScope();

        component.inputFormFields = formFields;
        component.width = 'col-12';
        component.inputFormGroup = new FormGroup({});

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('form entries should be wrapped by div with classes `container-fluid` and `row`', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let formDebugElement:DebugElement = debugElement.query(By.css('div'));
        let containerFluidDebugElement:DebugElement = formDebugElement.query(By.css('div.container-fluid'));

        expect(containerFluidDebugElement).toBeTruthy();

        let rowDebugElement:DebugElement = containerFluidDebugElement.query(By.css('div.row'));

        expect(rowDebugElement).toBeTruthy();
    });
});
