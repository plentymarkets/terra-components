import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { L10nTranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { TableSettingsDialogComponent } from './table-settings-dialog.component';
import { TableSettingsDialogData } from '../interface/table-settings-dialog-data.interface';
import { MockButtonComponent } from '../../../../testing/mock-button';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnInterface } from '../interface/column.interface';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatListOptionHarness, MatSelectionListHarness } from '@angular/material/list/testing';

const column1: ColumnInterface = { key: 'TestName1', label: 'TestName1' };
const column2: ColumnInterface = { key: 'TestName2', label: 'TestName2' };
const column3: ColumnInterface = { key: 'TestName3', label: 'TestName3' };
let mockDialogData: TableSettingsDialogData = {
    columns: [column1, column2, column3],
    selectedColumns: [column2.key, column3.key]
};

describe('TableSettingsDialogComponent', () => {
    let fixture: ComponentFixture<TableSettingsDialogComponent>;
    let component: TableSettingsDialogComponent;
    let loader: HarnessLoader;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TableSettingsDialogComponent, MockButtonComponent],
            imports: [
                MatListModule,
                MatDialogModule,
                L10nTranslationModule.forRoot(mockL10nConfig),
                FormsModule,
                DragDropModule
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: mockDialogData
                }
            ]
        });

        fixture = TestBed.createComponent(TableSettingsDialogComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign the array of selected columns and columns by `OnInit` life cycle hook', () => {
        component.ngOnInit();
        expect(component._selectedColumns).toEqual(component.data.selectedColumns);
        expect(component._columns).toEqual(component.data.columns);
    });

    it('should render list options', async () => {
        const selectionListHarness = await loader.getHarness(MatSelectionListHarness);
        const options = await selectionListHarness.getItems();
        expect(options.length).toBe(component.data.columns.length);
    });

    it('should render column names in options', async () => {
        const selectionListHarness = await loader.getHarness(MatSelectionListHarness);
        const options = await selectionListHarness.getItems();
        const optionTexts: Array<string> = await Promise.all(
            options.map((option: MatListOptionHarness) => option.getText())
        );
        component.data.columns.forEach((column: ColumnInterface) => expect(optionTexts).toContain(column.key));
    });

    it('should create a new list of selected columns after drop event and move a column to the right index in array', () => {
        const dropEvent1: Partial<CdkDragDrop<Array<ColumnInterface>>> = { previousIndex: 0, currentIndex: 2 };
        component._onDrop(dropEvent1 as CdkDragDrop<Array<ColumnInterface>>);
        expect(component._selectedColumns).toEqual([column2.key, column3.key]);
        expect(component._columns).toEqual([column2, column3, column1]);

        const dropEvent2: Partial<CdkDragDrop<Array<ColumnInterface>>> = { previousIndex: 1, currentIndex: 0 };
        component._onDrop(dropEvent2 as CdkDragDrop<Array<ColumnInterface>>);
        expect(component._selectedColumns).toEqual([column3.key, column2.key]);
        expect(component._columns).toEqual([column3, column2, column1]);
    });
});
