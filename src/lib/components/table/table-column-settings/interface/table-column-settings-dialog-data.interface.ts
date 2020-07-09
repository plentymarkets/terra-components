import { MatColumnDef } from '@angular/material/table';

export interface TableColumnSettingsDialogData {
    columns: Array<MatColumnDef>;
    selectedColumns:Array<string>;
}
