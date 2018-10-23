import { TerraDataTableComponent } from './terra-data-table.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { TerraPagerComponent } from '../../pager/terra-pager.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
import { TerraCheckboxComponent } from '../../forms/checkbox/terra-checkbox.component';
import { TerraDataTableContextMenuComponent } from './context-menu/terra-data-table-context-menu.component';
import { TerraNoResultNoticeComponent } from '../../no-result/terra-no-result-notice.component';
import { TerraTaglistComponent } from '../../layouts/taglist/terra-taglist.component';
import { TerraDataTableContextMenuDirective } from './context-menu/terra-data-table-context-menu.directive';
import { TerraBaseToolbarComponent } from '../../toolbar/base-toolbar/terra-base-toolbar.component';
import { TerraNumberInputComponent } from '../../forms/input/number-input/terra-number-input.component';
import { TerraSelectBoxComponent } from '../../forms/select-box/terra-select-box.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TerraTagComponent } from '../../layouts/tag/terra-tag.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('Component: TerraDataTableComponent', () =>
{
    let component:TerraDataTableComponent<any, any>; // TODO T and P should be defined
    let fixture:ComponentFixture<TerraDataTableComponent<any, any>>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraDataTableComponent,
                TerraButtonComponent,
                TerraPagerComponent,
                TerraCheckboxComponent,
                TerraDataTableContextMenuComponent,
                TerraDataTableContextMenuDirective,
                TerraNoResultNoticeComponent,
                TerraTaglistComponent,
                TerraTagComponent,
                TerraBaseToolbarComponent,
                TerraNumberInputComponent,
                TerraSelectBoxComponent
            ],
            imports:      [
                TooltipModule.forRoot(),
                CommonModule,
                FormsModule,
                HttpModule,
                HttpClientModule,
                NoopAnimationsModule,
                LocalizationModule.forRoot(l10nConfig)
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraDataTableComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

     it('should create', () =>
     {
         expect(component).toBeTruthy();
     });
});
