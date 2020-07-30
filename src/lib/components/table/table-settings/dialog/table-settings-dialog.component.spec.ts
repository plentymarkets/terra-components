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
import { MockButtonComponent } from '../../../../testing/mock-button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnInterface } from '../interface/column.interface';


const column1:ColumnInterface = {key: 'TestName1', label: 'TestName1'};
const column2:ColumnInterface = {key: 'TestName2', label: 'TestName2'};
const column3:ColumnInterface = {key: 'TestName3', label: 'TestName3'};
let mockDialogData:TableSettingsDialogData = {
    columns:         [column1, column2, column3],
    selectedColumns: [column2.key, column3.key]
};

describe('TableSettingsDialogComponent', () =>
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
                FormsModule,
                DragDropModule
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

    it('should assign the array of selected columns and columns by `OnInit` life cycle hook', () =>
    {
        spyOn(component, '_sort').and.returnValue([]);
        component.ngOnInit();
        expect(component._selectedColumns).toEqual(component.data.selectedColumns);
        expect(component._sort).toHaveBeenCalledWith(component.data.columns);
        expect(component._columns).toEqual([]);
    });

    it('should render list options', () =>
    {
        const options:Array<DebugElement> = fixture.debugElement.queryAll(By.css('mat-list-option'));
        expect(options.length).toBe(component.data.columns.length);
    });

    it('should render column names in options', () =>
    {
        const options:Array<DebugElement> = fixture.debugElement.queryAll(By.css('mat-list-option'));
        const optionTexts:Array<string> = options.map((option:DebugElement) => option.nativeElement.textContent);
        component.data.columns.forEach((column:ColumnInterface) => expect(optionTexts).toContain(column.key));
    });

    it('should sort the list of column names by selection and append unselected after selected', () =>
    {
        expect(component._columns).toEqual([column2, column3, column1]);
    });
});
