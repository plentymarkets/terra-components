import { TerraFormComponent } from './terra-form.component';
import { TerraControlTypeEnum } from '../dynamic-form/enum/terra-control-type.enum';
import { TerraFormFieldInterface } from './model/terra-form-field.interface';
import { TerraFormFieldBase } from '../dynamic-form/data/terra-form-field-base';
import { TerraFormTypeMap } from './model/terra-form-type-map.enum';
import { FormTypeMap } from './model/form-type-map';
import {
    DebugElement,
    NO_ERRORS_SCHEMA,
    SimpleChange
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TerraFormContainerComponent } from './form-container/terra-form-container.component';
import Spy = jasmine.Spy;

describe(`TerraFormComponent:`, () =>
{
    let component:TerraFormComponent;
    let fixture:ComponentFixture<TerraFormComponent>;
    const formFields:{ [key:string]:TerraFormFieldInterface } = {
        control1: {type: 'text', defaultValue: 'one'},
        control2: {type: 'text', defaultValue: 'two'}
    };

    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
            schemas:      [NO_ERRORS_SCHEMA],
            declarations: [TerraFormComponent, TerraFormContainerComponent]
        }).createComponent(TerraFormComponent);

        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        expect(component.inputIsDisabled).toBe(false);
        expect(component.inputFormFields).toEqual({});
        expect(component.inputControlTypeMap).toBeUndefined();
    });

    it('should use a TerraFormTypeMap instance as fallback internally if no custom map is given via #inputControlTypeMap', () =>
    {
        spyOn(console, 'warn'); // disable console outputs to prevent deprecation warnings to be printed in the terminal
        component.ngOnChanges({});
        component.ngOnInit();
        expect(component._controlTypeMap).toEqual(new TerraFormTypeMap());
        expect(console.warn).toHaveBeenCalledTimes(2);
    });

    it('should use a custom map if given via #inputControlTypeMap', () =>
    {
        const typeMap:FormTypeMap = new FormTypeMap();
        component.inputControlTypeMap = typeMap;
        component.ngOnChanges({inputControlTypeMap: new SimpleChange(null, typeMap, false)});
        component.ngOnInit();
        expect(component._controlTypeMap).toBe(typeMap);
    });

    it('should wrap the #TerraFormContainerComponent in a div-element with a `container-fluid`-class', () =>
    {
        const containerFluid:DebugElement = fixture.debugElement.query(By.css('.container-fluid'));
        expect(containerFluid).toBeTruthy();
        const formContainer:TerraFormContainerComponent = containerFluid.query(By.directive(TerraFormContainerComponent)).componentInstance;
        expect(formContainer).toBeTruthy();
    });

    describe('with _formFields', () =>
    {
        beforeEach(() => component.inputFormFields = formFields);

        it('setting #inputFormFields creates a reactive #_formGroup instance containing all the given form fields', () =>
        {
            expect(component.formGroup).toBeDefined();
            Object.keys(formFields).forEach((formFieldKey:string) => expect(component.formGroup.contains(formFieldKey)));
        });

        it('writing values to the model via #writeValue should patchValues in #_formGroup and change scope-data', () =>
        {
            let mockValues:any = {control1: 'one', control2: 'two'};
            spyOn(component.formGroup, 'patchValue').and.callThrough();

            component.writeValue(mockValues);

            expect(component.scope.data).toBe(mockValues);
            expect(component.formGroup.patchValue).toHaveBeenCalledWith(mockValues);
            expect(component.formGroup.value).toEqual(mockValues);
        });

        it('writing `null` to the model via #writeValue resets the #_formGroup to the default values of the given _formFields', () =>
        {
            const defaultValues:any = {control1: 'one', control2: 'two'};
            spyOn(component.formGroup, 'reset').and.callThrough();

            component.writeValue(null);

            expect(component.formGroup.untouched).toBe(true);
            expect(component.formGroup.value).toEqual(defaultValues);
            expect(component.formGroup.reset).toHaveBeenCalledWith(defaultValues);
        });

        it('should call a registered callback on change', () =>
        {
            let mockValues:any = {control1: 'one'};
            let spy:Spy = jasmine.createSpy('spy');
            component.registerOnChange(spy);
            component.formGroup.patchValue(mockValues);
            expect(spy).toHaveBeenCalled();
        });
    });

    it('should transform legacy formfields', () =>
    {
        let legacyFormField:TerraFormFieldBase<string> = new TerraFormFieldBase<string>('test', TerraControlTypeEnum.INPUT_TEXT, '', true, {});

        component.inputFormFields = [legacyFormField];

        expect(component.inputFormFields['test']).toBeDefined();
    });
});
