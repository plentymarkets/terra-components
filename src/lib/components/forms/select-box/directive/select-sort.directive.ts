import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SortHelper } from '../../../../helpers';
import { TerraSelectBoxValueInterface } from '../../../forms/select-box/data/terra-select-box.interface';
import { SortDirection } from '@angular/material/sort';

@Directive({
    selector: 'terra-select-box[inputListBoxValues]'
})
export class SelectSortDirective implements OnChanges {
    @Input()
    public inputListBoxValues: Array<TerraSelectBoxValueInterface>;

    @Input()
    public disableSorting: boolean = false;

    @Input()
    public sortDirection: SortDirection = 'asc';

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['inputListBoxValues'] || changes['sortDirection'] || changes['disableSorting']) {
            this.sortListBoxValues();
        }
    }

    private sortListBoxValues(): void {
        if (!this.disableSorting) {
            this.inputListBoxValues = SortHelper.sortArray(this.inputListBoxValues, this.sortDirection, 'caption');
        }
    }
}
