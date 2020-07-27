import { MatColumnDef } from '@angular/material/table';

export interface TableSettingsDialogData
{
    columns:Array<MatColumnDef>;
    selectedColumns:Array<string>;
}
