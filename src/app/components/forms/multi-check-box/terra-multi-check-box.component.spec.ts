import { TerraMultiCheckBoxComponent } from './terra-multi-check-box.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';
import { TerraCheckboxComponent } from '../../../..';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';

describe('Component: TerraMultiCheckBoxComponent', () =>
{
    let component:TerraMultiCheckBoxComponent;
    let fixture:ComponentFixture<TerraMultiCheckBoxComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [CheckboxGroupComponent,
                               TerraCheckboxComponent,
                               TerraMultiCheckBoxComponent],
                imports:      [
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
        fixture = TestBed.createComponent(TerraMultiCheckBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should init its inputs`, () =>
    {
        expect(component.collapsed).toBe(false);
        expect(component.inputIsDisabled).toBe(false);
    });
});
