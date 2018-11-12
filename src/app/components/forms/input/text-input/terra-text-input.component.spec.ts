import { TerraTextInputComponent } from './terra-text-input.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { HttpClientModule } from '@angular/common/http';

fdescribe('Component: TerraTextInputComponent', () =>
{
    let component:TerraTextInputComponent;
    let fixture:ComponentFixture<TerraTextInputComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TerraTextInputComponent, TerraLabelTooltipDirective],
                imports: [
                    HttpClientModule,
                    TooltipModule.forRoot(),
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ]
            }
        ).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTextInputComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should set the input element's readonly property according to the state of #inputIsReadonly`,  () =>
    {
        let inputElement:HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(component.inputIsReadonly).toBeFalsy();
        expect(inputElement.readOnly).toBeFalsy();

        component.inputIsReadonly = true;

        fixture.detectChanges();

        expect(inputElement.readOnly).toBeTruthy();
    });

    //afterAll(() =>
    //{
    //    fixture.destroy();
    //    TestBed.resetTestingModule();
    //});
});
