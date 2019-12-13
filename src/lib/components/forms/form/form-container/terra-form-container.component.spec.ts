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
import { element } from '@angular/core/src/render3';

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
        const formDebugElement:DebugElement = debugElement.query(By.css('div'));
        const containerFluidDebugElements:Array<DebugElement> = formDebugElement.queryAll(By.css('div.container-fluid'));
        let rowDebugElement:DebugElement;

        expect(containerFluidDebugElements.length).toBe(1);

        const formEntries:Array<DebugElement> = fixture.debugElement.queryAll(By.css('.form-entry'));
        expect(formEntries.length).toBe(component._formFields.length);

        const rowDebugElements:Array<DebugElement> = containerFluidDebugElements[0].queryAll(By.css('div.row'));
        expect(rowDebugElements.length).toBe(formEntries.length);
        console.log('Rows: ' + rowDebugElements.length);

        containerFluidDebugElements.forEach((element:DebugElement) =>
        {
            expect(element).toBeTruthy();
            rowDebugElement = element.query(By.css('div.row'));
            expect(rowDebugElement).toBeTruthy();
        });
    });
});
