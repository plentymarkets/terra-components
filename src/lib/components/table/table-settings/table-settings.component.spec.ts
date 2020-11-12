import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationModule } from 'angular-l10n';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableSettingsComponent } from './table-settings.component';
import { Observable, of } from 'rxjs';
import { TableSettingsDialogComponent } from './dialog/table-settings-dialog.component';
import { MockButtonComponent } from '../../../testing/mock-button';

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
            declarations: [TableSettingsComponent, MockButtonComponent],
            imports: [TranslationModule.forRoot({})],
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
        const dialog: MatDialog = TestBed.get(MatDialog);
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
