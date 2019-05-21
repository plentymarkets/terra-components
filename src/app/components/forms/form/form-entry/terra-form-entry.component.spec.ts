import { FormEntryContainerDirective } from './form-entry-container.directive';
import { TerraFormEntryComponent } from './terra-form-entry.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraTextInputComponent } from '../../input/text-input/terra-text-input.component';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { MockTranslationModule } from '../../../../testing/mock-translation-module';
import Spy = jasmine.Spy;

@NgModule({
    imports: [CommonModule, FormsModule, TooltipModule.forRoot(), MockTranslationModule],
    declarations: [TerraLabelTooltipDirective, TerraTextInputComponent],
    entryComponents: [TerraTextInputComponent],
})
class EntryComponentsModule {}

fdescribe(`TerraFormEntryComponent:`, () =>
{
    let fixture:ComponentFixture<TerraFormEntryComponent>;
    let component:TerraFormEntryComponent;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [FormEntryContainerDirective, TerraFormEntryComponent],
            imports: [EntryComponentsModule]
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

    it(`should display a warning in the console when a given #inputFormField's type is not supported by the given #inputControlTypeMap`, () =>
    {
        let consoleSpy:Spy = spyOn(console, 'warn');
        const type:string = 'bla';
        component.inputControlTypeMap = {};
        component.inputFormField = {
            type: type
        };
        fixture.detectChanges();
        expect(component['controlType']).toBe(TerraTextInputComponent);
        expect(component['componentInstance'] instanceof TerraTextInputComponent).toBe(true);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(`Type ${type} not supported.`);
    });
});
