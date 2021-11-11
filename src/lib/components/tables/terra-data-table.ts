import { TerraDataTableRowInterface } from './data-table/interfaces/terra-data-table-row.interface';

/** Interface that acts as a lightweight injection token for the {@link TerraDataTableComponent}. */
export abstract class TerraDataTable<T> {
    public abstract inputHasCheckboxes: boolean;
    public abstract rowClicked(row: TerraDataTableRowInterface<T>): void;
    public abstract onRowCheckboxChange(row: TerraDataTableRowInterface<T>): void;
}
