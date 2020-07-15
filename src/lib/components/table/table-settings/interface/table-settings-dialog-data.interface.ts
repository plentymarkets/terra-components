import { MatColumnDef } from '@angular/material/table';
import { QueryList } from '@angular/core';

export interface TableSettingsDialogData {
    columns:Array<MatColumnDef>;
    selectedColumns:Array<string>;
}
