import { TerraDataTableRowInterface } from './data-table/interfaces/terra-data-table-row.interface';

export abstract class TerraDataTableToken<T> {
    public abstract inputHasCheckboxes: boolean;
    public abstract rowClicked(row: TerraDataTableRowInterface<T>): void;
    public abstract onRowCheckboxChange(row: TerraDataTableRowInterface<T>): void;
}
