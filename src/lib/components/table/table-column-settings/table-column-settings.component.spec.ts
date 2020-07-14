import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
import { TableColumnSettingsComponent } from './table-column-settings.component';
import Spy = jasmine.Spy;
import {
    TerraButtonComponent,
    TooltipDirective
} from '../../..';
import {
    MatDialogModule
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MockRouter } from '../../../testing/mock-router';
import { TableColumnSettingsDialogComponent } from './dialog/table-column-settings-dialog.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

describe('TableColumnSettingsComponent', () =>
{
    let component:TableColumnSettingsComponent;
    let fixture:ComponentFixture<TableColumnSettingsComponent>;

    const router:MockRouter = new MockRouter();

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TableColumnSettingsComponent,
                                TableColumnSettingsDialogComponent,
                               TooltipDirective,
                               TerraButtonComponent],
                imports:      [
                    LocalizationModule.forRoot(l10nConfig),
                    MatDialogModule,
                    MatListModule,
                    FormsModule
                ],
                providers: [{
                    provide: Router,
                    useValue:router
                },]
            }
        );
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TableColumnSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open settings dialog', () =>
    {
        const spyOpen:Spy = spyOn(component._dialog, 'open')
        component._openSettings();
        expect(spyOpen).toHaveBeenCalled();
    });
});
