import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormEntryContainerDirective } from './form-entry-container.directive';
import { TerraFormEntryComponent } from './terra-form-entry.component';

describe('TerraFormEntryComponent: ', () =>
{
    let component:TerraFormEntryComponent;
    let fixture:ComponentFixture<TerraFormEntryComponent>;
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraFormEntryComponent,
                FormEntryContainerDirective
            ]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFormEntryComponent);
        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        expect(component.inputFormField).toBeUndefined();
        expect(component.inputFormControl).toBeUndefined();
        expect(component.inputControlTypeMap).toEqual({});
        expect(component.inputIsDisabled).toBe(false);
    });
});
