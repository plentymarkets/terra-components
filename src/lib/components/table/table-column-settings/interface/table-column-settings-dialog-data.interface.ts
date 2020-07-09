import { MatColumnDef } from '@angular/material/table';
import { QueryList } from '@angular/core';

export interface TableColumnSettingsDialogData {
    columns: QueryList<MatColumnDef>;
    selectedColumns: Array<string>;
}
