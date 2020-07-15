import {
    Directive,
    Input
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TranslationModule } from 'angular-l10n';
import {
    MatDialog,
    MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableSettingsComponent } from './table-settings.component';
import { of } from 'rxjs';

@Directive({selector: '[tcTooltip]'})
class MockTooltipDirective
{
    @Input('tcTooltip')
    public tooltip:string;
}

describe('TableSettingsComponent', () =>
{
    let component:TableSettingsComponent;
    let fixture:ComponentFixture<TableSettingsComponent>;

    let mockDialogRef:Partial<MatDialogRef<any>> = {
        afterClosed: () => of([])
    };
    let mockDialog:Partial<MatDialog> = {
        open: () => mockDialogRef as MatDialogRef<any>,
    };

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [
                    TableSettingsComponent,
                    MockTooltipDirective
                ],
                imports:      [
                    TranslationModule.forRoot({}),
                    MatButtonModule
                ],
                providers:    [
                    {
                        provide:  MatDialog,
                        useValue: mockDialog
                    }
                ]
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
        spyOn(dialog, 'open').and.callThrough();
        component._openSettings();
        expect(dialog.open).toHaveBeenCalled();
    });
});
