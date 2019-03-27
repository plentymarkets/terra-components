import { TerraCheckboxComponent } from './terra-checkbox.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Spy = jasmine.Spy;

describe('Component: TerraCheckboxComponent', () =>
{
    let component:TerraCheckboxComponent;
    let fixture:ComponentFixture<TerraCheckboxComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraCheckboxComponent],
            imports: [TooltipModule.forRoot(), FormsModule]
        }).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraCheckboxComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    describe('ControlValueAccessor', () =>
    {
        let onChangeSpy:Spy;
        beforeEach(() =>
        {
            onChangeSpy = jasmine.createSpy('onChange');
            component.registerOnChange(onChangeSpy);
        });

        it('should not call change callback if a new value is set via #writeValue()', () =>
        {
            component.writeValue(!component.value); // toggle value
            expect(onChangeSpy).not.toHaveBeenCalled();
        });

        xit('should call change callback if the value changes by clicking the checkbox', () =>
        {
            let inputElement:DebugElement = fixture.debugElement.query(By.css('input'));
            inputElement.triggerEventHandler('input', true);
            expect(onChangeSpy).toHaveBeenCalledWith(true);
        });
    });
});
