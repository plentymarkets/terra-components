import { Component, Inject } from '@angular/core';
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

    constructor(@Inject(MAT_DIALOG_DATA) public deleteCount: number) {}
}
