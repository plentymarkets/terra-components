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
    MatDialog,
    MatDialogModule
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MockRouter } from '../../../testing/mock-router';
import { TableColumnSettingsDialogComponent } from './dialog/table-column-settings-dialog.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {
    MatTableModule
} from '@angular/material/table';
import {
    NgModule
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';

describe('TableColumnSettingsComponent', () =>
{
    let component:TableColumnSettingsComponent;
    let fixture:ComponentFixture<TableColumnSettingsComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TableColumnSettingsComponent],
                imports:      [
                    LocalizationModule.forRoot({}),
                    FormsModule,
                    BrowserAnimationsModule,
                    MatTableModule,
                    TestModule]
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
        const dialog:MatDialog = TestBed.get(MatDialog);
        const spyOpen:Spy = spyOn(dialog, 'open').and.callThrough();
        component._openSettings();
        expect(spyOpen).toHaveBeenCalled();
    });
});

@NgModule({
    declarations:    [TableColumnSettingsDialogComponent,
                      TerraButtonComponent,
                      TooltipDirective],
    entryComponents: [TableColumnSettingsDialogComponent],
    imports:         [MatDialogModule,
                      MatSelectModule,
                      FormsModule,
                      MatListModule,
                      BrowserModule,
                      LocalizationModule.forRoot({})],
    providers:       [
        {
            provide:  Router,
            useValue: new MockRouter()
        }],
    exports:         [TooltipDirective]
})
class TestModule
{
}
