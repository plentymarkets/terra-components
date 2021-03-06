import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableSettingsComponent } from './table-settings.component';
import { Observable, of } from 'rxjs';
import { TableSettingsDialogComponent } from './dialog/table-settings-dialog.component';
import { mockL10nConfig } from '../../../testing/mock-l10n-config';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[tcTooltip]' })
class TooltipMockDirective {
    @Input('tcTooltip') public tooltip: string | TemplateRef<any>;
}

describe('TableSettingsComponent', () => {
    let component: TableSettingsComponent;
    let fixture: ComponentFixture<TableSettingsComponent>;

    let mockDialogRef: Partial<MatDialogRef<any>> = {
        afterClosed: (): Observable<Array<string>> => of(['four', 'five'])
    };
    let mockDialog: Partial<MatDialog> = {
        open: (): MatDialogRef<any> => mockDialogRef as MatDialogRef<any>
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TableSettingsComponent, TooltipMockDirective],
            imports: [L10nTranslationModule.forRoot(mockL10nConfig), MatIconModule, MatButtonModule],
            providers: [
                {
                    provide: MatDialog,
                    useValue: mockDialog
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open settings dialog', () => {
        const dialog: MatDialog = TestBed.inject(MatDialog);
        spyOn(dialog, 'open').and.callThrough();
        component._openSettings();
        expect(dialog.open).toHaveBeenCalledWith(TableSettingsDialogComponent, {
            width: 'auto',
            disableClose: true,
            data: {
                columns: [],
                selectedColumns: []
            },
            minWidth: 220
        });
    });

    it('should update selected columns', () => {
        component.selectedColumns = ['one', 'two', 'three'];
        component._openSettings();

        expect(component.selectedColumns).toEqual(['four', 'five']);
    });
});
