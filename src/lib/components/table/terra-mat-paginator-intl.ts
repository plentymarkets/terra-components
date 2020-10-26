import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslationService } from 'angular-l10n';

@Injectable()
export class TerraMatPaginatorIntl extends MatPaginatorIntl {
    public nextPageLabel: string = '';
    public previousPageLabel: string = '';
    public firstPageLabel: string = '';
    public lastPageLabel: string = '';

    constructor(private translation: TranslationService) {
        super();
        this.translation.translationChanged().subscribe(() => {
            this.updateLabels();
            this.changes.next();
        });
    }

    /**
     * @description Returns the pagination range label
     *
     * @param page
     * @param pageSize
     * @param length
     * @returns string
     */
    public getRangeLabel = (page: number, pageSize: number, length: number): string => {
        let ofLabel: string = this.translation.translate('terraMatPaginatorIntl.ofLabel');

        if (length === 0 || pageSize === 0) {
            return `0 ${ofLabel} ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex: number = page * pageSize;
        const endIndex: number = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} – ${endIndex} ${ofLabel} ${length}`;
    };

    private updateLabels(): void {
        this.itemsPerPageLabel = this.translation.translate('terraMatPaginatorIntl.itemsPerPage');
    }
}
