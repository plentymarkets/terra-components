import { TerraDataTableComponent } from './terra-data-table.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraPagerComponent } from '../../pager/terra-pager.component';
import { TerraButtonComponent } from '../../buttons/button/terra-button.component';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TerraDataTableServiceExample } from './example/terra-data-table.service.example';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { ChangeDetectionStrategy, DebugElement, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../../testing/mock-activated-route';
import { mockL10nConfig } from '../../../testing/mock-l10n-config';
import { MockTooltipDirective } from '../../../testing/mock-tooltip.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TerraDataTableRowInterface } from './interfaces/terra-data-table-row.interface';
import Spy = jasmine.Spy;

@Directive({
    selector: 'tr[tcTableRow]'
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class TableRowMockComponent {
    @Input('tcTableRow')
    public row: TerraDataTableRowInterface<any>;
}

describe('TerraDataTableComponent', () => {
    let component: TerraDataTableComponent<any, any>;
    let fixture: ComponentFixture<TerraDataTableComponent<any, any>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockTooltipDirective,
                TerraDataTableComponent,
                TerraButtonComponent,
                TerraPagerComponent,
                TerraDataTableContextMenuComponent,
                TerraDataTableContextMenuDirective,
                TerraNoResultNoticeComponent,
                TerraTaglistComponent,
                TerraTagComponent,
                TerraBaseToolbarComponent,
                TerraNumberInputComponent,
                TerraSelectBoxComponent,
                TableRowMockComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                NoopAnimationsModule,
                L10nTranslationModule.forRoot(mockL10nConfig),
                MatCheckboxModule
            ],
            providers: [
                TerraDataTableServiceExample,
                TerraLoadingSpinnerService,
                {
                    provide: ActivatedRoute,
                    useClass: MockActivatedRoute
                }
            ]
        }).overrideComponent(TerraDataTableComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
            }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraDataTableComponent);
        component = fixture.componentInstance;
        spyOn(console, 'error'); // do not log anything to console
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('With an #inputService', () => {
        let service: TerraDataTableServiceExample;
        beforeEach(() => {
            service = TestBed.inject(TerraDataTableServiceExample);
            component.inputService = service;
        });

        it('should have an #inputService', () => {
            expect(component.inputService).toBeDefined();
        });

        describe('#inputHasPager', () => {
            it('should initialise #inputHasPager with true', () => {
                expect(component.inputHasPager).toBe(true);
            });

            it('should hide the pager if #inputHasPager is set but no data is available', () => {
                let pagerDE: DebugElement = fixture.nativeElement.querySelector('terra-pager');
                expect(service.rowList).toBeDefined();
                expect(service.rowList.length).toEqual(0);
                expect(pagerDE.attributes.hasOwnProperty('hidden')).toBe(true);
            });

            it('should show the pager if #inputHasPager is set and data is available', async(() => {
                service.addEntry();
                service.getResults();
                fixture.detectChanges();

                let pagerDE: DebugElement = fixture.debugElement.query(By.css('terra-pager'));
                expect(service.rowList).toBeDefined();
                expect(service.rowList.length).toBeGreaterThan(0);
                expect(pagerDE.attributes.hasOwnProperty('hidden')).toBe(false);
            }));

            it(`should hide the pager if #inputHasPager is not set`, () => {
                component.inputHasPager = false;
                service.addEntry();
                service.getResults();
                fixture.detectChanges();

                let pagerDE: DebugElement = fixture.debugElement.query(By.css('terra-pager'));
                expect(service.rowList).toBeDefined();
                expect(service.rowList.length).toBeGreaterThan(0);
                expect(pagerDE).toBeNull();
            });
        });

        it(`should #getResults() and #resetSelectedRows when the pager-component emits on #outputDoPaging`, () => {
            let spy: Spy = spyOn(service, 'getResults').and.callThrough();
            service.addEntry();
            service.getResults();

            fixture.detectChanges();

            let pagerDE: DebugElement = fixture.debugElement.query(By.css('terra-pager'));
            let pagerComponent: TerraPagerComponent = pagerDE.componentInstance;
            pagerComponent.outputDoPaging.emit();

            expect(spy).toHaveBeenCalled();
            expect(component.selectedRowList.length).toEqual(0);
        });
    });
});
