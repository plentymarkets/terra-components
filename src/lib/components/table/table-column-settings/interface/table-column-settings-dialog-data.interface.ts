import { ColumnInterface } from './column.interface';

export interface TableColumnSettingsDialogData {
    columns: Array<ColumnInterface>;
    selectedColumns: Array<ColumnInterface>;
}
