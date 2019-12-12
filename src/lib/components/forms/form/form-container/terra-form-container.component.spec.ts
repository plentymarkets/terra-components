import { TerraFormContainerComponent } from './terra-form-container.component';
import {
    async,
    ComponentFixture,
    inject,
    TestBed
} from '@angular/core/testing';
import { TerraFormContainerWrapperComponent } from './container-wrapper/terra-form-container-wrapper.component';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { TranslationModule } from 'angular-l10n';
import { MockTranslationModule } from '../../../../testing/mock-translation-module';
import { l10nConfig } from '../../../../../app/translation/l10n.config';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraFormEntryListComponent } from '../form-entry-list/terra-form-entry-list.component';
import { TerraFormEntryComponent } from '../form-entry/terra-form-entry.component';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe(`TerraFormContainerComponent:`, () =>
{
    let component:TerraFormContainerComponent;
    let fixture:ComponentFixture<TerraFormContainerComponent>;

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

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            imports:      [
                FormsModule,
                ReactiveFormsModule,
                MockTranslationModule,
                TranslationModule.forRoot(l10nConfig)
            ],
            declarations: [TerraFormEntryListComponent,
                           TerraFormEntryComponent,
                           TerraButtonComponent,
                           TerraFormContainerWrapperComponent,
                           TerraFormContainerComponent,
                           TooltipDirective]
        }).compileComponents();
    }));

    beforeEach(inject([FormBuilder], (fb:FormBuilder) =>
    {
        fixture = TestBed.createComponent(TerraFormContainerComponent);
        component = fixture.componentInstance;
        component.inputFormFields = formFields;
        component.inputFormGroup = fb.group(
            {
                name:  ['Test Name',
                        Validators.required],
                email: ['',
                        Validators.required]
            }
        );

        fixture.detectChanges();
    }));

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('form entries should be wrapped by div with classes `container-fluid` and `row`', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let containerFluidDebugElement:DebugElement = debugElement.query(By.css('div.container-fluid'));
        expect(containerFluidDebugElement).toBeDefined();
    });
});
