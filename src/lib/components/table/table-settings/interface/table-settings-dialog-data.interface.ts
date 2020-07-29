import { ColumnInterface } from './column.interface';

export interface TableSettingsDialogData
{
    columns:Array<ColumnInterface>;
    selectedColumns:Array<string>;
}
