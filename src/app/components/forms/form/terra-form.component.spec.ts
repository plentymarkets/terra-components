import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFormComponent } from './terra-form.component';
import { TerraFormContainerComponent } from './form-container/terra-form-container.component';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { TerraFormEntryListComponent } from './form-entry-list/terra-form-entry-list.component';
import { TooltipModule } from 'ngx-bootstrap';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { TerraFormEntryComponent } from './form-entry/terra-form-entry.component';
import { TerraButtonComponent } from '../../../..';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';

fdescribe(`TerraCardComponent:`, () =>
{
    let component:TerraFormComponent;
    let fixture:ComponentFixture<TerraFormComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraLabelTooltipDirective,
                           TerraButtonComponent,
                           TerraFormEntryListComponent,
                           TerraFormEntryComponent,
                           TerraFormContainerComponent,
                           TerraFormComponent],
            imports:      [TooltipModule.forRoot(),
                           FormsModule,
                           ReactiveFormsModule,
                           LocalizationModule.forRoot(l10nConfig)]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        // TODO
    });
});
