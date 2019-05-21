import { FormEntryContainerDirective } from './form-entry-container.directive';
import { TerraFormEntryComponent } from './terra-form-entry.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

describe(`TerraFormEntryComponent:`, () =>
{
    let fixture:ComponentFixture<TerraFormEntryComponent>;
    let component:TerraFormEntryComponent;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [FormEntryContainerDirective, TerraFormEntryComponent]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFormEntryComponent);
        component = fixture.componentInstance;
    });

    it(`should create`, () =>
    {
        expect(component).toBeDefined();
    });
});
