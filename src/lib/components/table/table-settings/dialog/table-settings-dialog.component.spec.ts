import { DebugElement } from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import {
    MAT_DIALOG_DATA,
    MatDialogModule
} from '@angular/material/dialog';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { TableSettingsDialogComponent } from './table-settings-dialog.component';
import { TableSettingsDialogData } from '../interface/table-settings-dialog-data.interface';
import { By } from '@angular/platform-browser';
import { MatColumnDef } from '@angular/material/table';
import { MockButtonComponent } from '../../../../testing/mock-button';


const column:MatColumnDef = new MatColumnDef();
column.name = 'TestName';
let mockDialogData:TableSettingsDialogData = {
    columns:         [column],
    selectedColumns: []
};

fdescribe('TableSettingsDialogComponent', () =>
{
    let fixture:ComponentFixture<TableSettingsDialogComponent>;
    let component:TableSettingsDialogComponent;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TableSettingsDialogComponent,
                MockButtonComponent
            ],
            imports:      [
                MatListModule,
                MatDialogModule,
                TranslationModule.forRoot({}),
                FormsModule
            ],
            providers:    [{
                provide:  MAT_DIALOG_DATA,
                useValue: mockDialogData
            }]
        });

        fixture = TestBed.createComponent(TableSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should render list options', () =>
    {
        const options:Array<DebugElement> = fixture.debugElement.queryAll(By.css('mat-list-option'));
        expect(options.length).toBe(1);
    });

    it('should render column name in option', () =>
    {
        const option:any = fixture.debugElement.query(By.css('mat-list-option')).nativeElement;
        expect(option.textContent).toBe(' TestName ');
    });
});
