import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { LocalizationModule } from 'angular-l10n';
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
import { TableSettingsComponent } from './table-settings.component';
import { TableSettingsDialogComponent } from './dialog/table-settings-dialog.component';

describe('TableSettingsComponent', () =>
{
    let component:TableSettingsComponent;
    let fixture:ComponentFixture<TableSettingsComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TableSettingsComponent],
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
        fixture = TestBed.createComponent(TableSettingsComponent);
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
    declarations:    [TableSettingsDialogComponent,
                      TerraButtonComponent,
                      TooltipDirective],
    entryComponents: [TableSettingsDialogComponent],
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
