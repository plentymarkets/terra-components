import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    DebugElement,
    NO_ERRORS_SCHEMA
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import {
    maxBootstrapCols,
    TerraFormContainerComponent
} from './terra-form-container.component';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormScope } from '../model/terra-form-scope.data';
import { TerraKeyValueInterface } from '../../../../models';

fdescribe('TerraFormContainerComponent: ', () =>
{
    let fixture:ComponentFixture<TerraFormContainerComponent>;
    let component:TerraFormContainerComponent;
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
        component.inputControlTypeMap = {};
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

        const hasDefaultWidth:boolean = formEntries.every((formEntry:DebugElement) =>
        {
            const divElement:HTMLDivElement = formEntry.nativeElement;
            return divElement.classList.contains(component.width);
        });

        expect(hasDefaultWidth).toBe(true);
    });

    describe('as a horizontal container', () =>
    {
        beforeEach(() =>
        {
            component.horizontal = true;
        });

        it('should not fall below a column size of 1', () =>
        {
            component.inputFormFields = createFormFields(maxBootstrapCols + 1);
            fixture.detectChanges();

            const formEntries:Array<DebugElement> = fixture.debugElement.queryAll(By.css('.form-entry'));
            expect(formEntries.length).toBe(component._formFields.length);
            const equallyDistributed:boolean = formEntries.every((formEntry:DebugElement) =>
            {
                const divElement:HTMLDivElement = formEntry.nativeElement;
                return divElement.classList.contains('col-' + 1);
            });
            expect(equallyDistributed).toBe(true);
        });

        it('should distribute its contained elements equally by default', () =>
        {
            component.inputFormFields = createFormFields(2);
            fixture.detectChanges();

            const formEntries:Array<DebugElement> = fixture.debugElement.queryAll(By.css('.form-entry'));
            expect(formEntries.length).toBe(component._formFields.length);
            const colWidth:number = Math.floor(maxBootstrapCols / formEntries.length);
            const equallyDistributed:boolean = formEntries.every((formEntry:DebugElement) =>
            {
                const divElement:HTMLDivElement = formEntry.nativeElement;
                return divElement.classList.contains('col-' + colWidth);
            });
            expect(equallyDistributed).toBe(true);
        });

        it(`should not exceed the maximum count of columns in bootstrap's grid system`, () =>
        {
            component.inputFormFields = {};
            fixture.detectChanges();
            let formEntries:Array<DebugElement> = fixture.debugElement.queryAll(By.css('.form-entry'));
            expect(formEntries.length).toBe(0);

            component.inputFormFields = createFormFields(1);
            fixture.detectChanges();
            formEntries = fixture.debugElement.queryAll(By.css('.form-entry'));
            expect(formEntries.length).toBe(1);
            const divElement:HTMLDivElement = formEntries[0].nativeElement;
            expect(divElement.classList.contains('col-12'));
        });
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
