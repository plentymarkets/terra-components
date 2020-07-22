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
import { DragDropModule } from '@angular/cdk/drag-drop';
import Spy = jasmine.Spy;


const column1:MatColumnDef = new MatColumnDef();
column1.name = 'TestName1';
const column2:MatColumnDef = new MatColumnDef();
column2.name = 'TestName2';
const column3:MatColumnDef = new MatColumnDef();
column3.name = 'TestName3';
let mockDialogData:TableSettingsDialogData = {
    columns:         [column1, column2, column3],
    selectedColumns: [column2.name, column3.name]
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

    xit('should assign the array of selected columns and columns by `OnInit` life cycle hook', () =>
    {
        spyOn(component, 'ngOnInit').and.callThrough();
        let spy:Spy = spyOn(component, '_sort');
        expect(component._selectedColumns).toEqual(component.data.selectedColumns);
        expect(spy).toHaveBeenCalledWith(component.data.columns);
    });

    it('should render list options', () =>
    {
        const options:Array<DebugElement> = fixture.debugElement.queryAll(By.css('mat-list-option'));
        expect(options.length).toBe(3);
    });

    it('should render column names in options', () =>
    {
        const option:Array<any> = fixture.debugElement.queryAll(By.css('mat-list-option'));
        expect(option[0].nativeElement.textContent).toContain('TestName');
    });

    it('should sort the list of column names by selection and append unselected after selected', () =>
    {
        expect(component._columns[2]).toEqual(column1);
    });

    it('should call `moveItemInArray` to change position of column and call `_sort` with changed column list', () =>
    {
        pending();
    });
});
