import { Component, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraStorageObject } from '../../..';
import { Language } from 'angular-l10n';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'tc-delete-file-confirmation-dialog',
    templateUrl: './delete-file-confirmation-dialog.component.html'
})
export class DeleteFileConfirmationDialogComponent {
    @Language()
    public _lang: string;

    public _translationPrefix: string = 'terraFileBrowser';

    constructor(@Inject(MAT_DIALOG_DATA) public data: Array<TerraStorageObject> = []) {}

    public get _deleteCount(): number {
        if (isNullOrUndefined(this.data)) {
            return 0;
        }

        return this.data
            .map((object: TerraStorageObject) => {
                return object.fileCount;
            })
            .reduce((sum: number, current: number) => {
                return sum + current;
            }, 0);
    }
}
