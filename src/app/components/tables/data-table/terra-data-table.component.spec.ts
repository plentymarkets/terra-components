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
import { TerraDataTableServiceExample } from './example/terra-data-table.service.example';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { DebugElement } from '@angular/core';
import { TerraLabelTooltipDirective } from '../../../helpers/terra-label-tooltip.directive';
import { TerraDataTableExampleInterface } from './example/terra-data-table.interface.example';
import { TerraPagerParameterInterface } from '../../../..';
import { By } from '@angular/platform-browser';

describe('TerraDataTableComponent', () =>
{
    let component:TerraDataTableComponent<TerraDataTableExampleInterface, TerraPagerParameterInterface>;
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
                TerraSelectBoxComponent,
                TerraLabelTooltipDirective
            ],
            imports:      [
                TooltipModule.forRoot(),
                CommonModule,
                FormsModule,
                HttpModule,
                HttpClientModule,
                NoopAnimationsModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                TerraDataTableServiceExample,
                TerraLoadingSpinnerService
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

    describe('#inputHasPager', () =>
    {
        it('should initialise `inputHasPager` with true', () =>
        {
            expect(component.inputHasPager).toBe(true);
        });

        it('should hide the pager if `inputHasPager` is set but no data is available', () =>
        {
            let service:TerraDataTableServiceExample = TestBed.get(TerraDataTableServiceExample);
            let pagerDE:DebugElement = fixture.nativeElement.querySelector('terra-pager');
            expect(component.inputHasPager).toBe(true);
            expect(service.rowList).toBeDefined();
            expect(service.rowList.length).toEqual(0);
            expect(pagerDE).toBeNull();
        });

        // TODO: Make it run!
        xit('should have a pager if `inputHasPager` is set and data is available', async(() =>
        {
            let debugElement:DebugElement = fixture.debugElement;
            let service:TerraDataTableServiceExample = TestBed.get(TerraDataTableServiceExample);
            service.getResults();
            component.inputHasPager = true;
            fixture.detectChanges();
            let pagerDE:DebugElement = debugElement.query(By.css('terra-pager'));
            expect(service.rowList).toBeDefined();
            expect(service.rowList.length).toBe(3);
            expect(pagerDE).toBeTruthy();
        }));
    });

    describe('With an inputService', () =>
    {
        beforeEach(() =>
        {
            component.inputService = TestBed.get(TerraDataTableServiceExample);
        });

        it('should have an inputService', () =>
        {
            expect(component.inputService).toBeDefined();
        });
    });
});
