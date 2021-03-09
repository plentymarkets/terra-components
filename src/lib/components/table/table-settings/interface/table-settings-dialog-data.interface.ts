import { ColumnInterface } from './column.interface';
import { CdkTable } from '@angular/cdk/table';

export interface TableSettingsDialogData {
    columns: Array<ColumnInterface>;
    selectedColumns: Array<string>;
    table?: CdkTable<any>;
}
