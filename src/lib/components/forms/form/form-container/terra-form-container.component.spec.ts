import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFormContainerComponent } from './terra-form-container.component';
import { NO_ERRORS_SCHEMA,
        DebugElement
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { TerraKeyValueInterface } from '../../../../models/terra-key-value.interface';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

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
        // initialisation of the component's mandatory inputs
        component.inputScope = new TerraFormScope();
        component.inputFormGroup = new FormGroup({});

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should set default width', () =>
    {
        component.width = 'col-12';
        component.inputFormFields = createFormFields(1);
        fixture.detectChanges();

        let formEntries:Array<DebugElement> = fixture.debugElement.queryAll(By.css('.form-entry'));

        const hasDefaultWidth:boolean = formEntries.every((formEntry:DebugElement)    =>
        {
            const divElement:HTMLDivElement = formEntry.nativeElement;
            return divElement.classList.contains(component.width);
        });

        expect(hasDefaultWidth).toBe(true);
    });

});

function createFormFields(count:number):TerraKeyValueInterface<TerraFormFieldInterface>
{
    const formFields:TerraKeyValueInterface<TerraFormFieldInterface> = {};
    for(let i:number = 1; i <= count; i++)
    {
        formFields['field' + i] = {
            type: 'text'
        };
    }
    return formFields;
}
