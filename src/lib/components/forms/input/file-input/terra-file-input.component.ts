import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraInputComponent } from '../terra-input.component';
import { FileTypeHelper, PathHelper, StringHelper, TerraRegex } from '../../../../helpers';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { TerraFileBrowserComponent } from '../../../file-browser/terra-file-browser.component';

let nextId: number = 0;

@Component({
    selector: 'terra-file-input',
    templateUrl: './terra-file-input.component.html',
    styleUrls: ['./terra-file-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraFileInputComponent,
            multi: true
        }
    ]
})
export class TerraFileInputComponent extends TerraInputComponent {
    @Input()
    public inputShowPreview: boolean = false;

    @Input()
    public inputAllowedExtensions: Array<string> = [];

    @Input()
    public inputAllowFolders: boolean = true;

    @Input()
    public inputStorageServices: Array<TerraBaseStorageService>;

    @ViewChild('fileBrowser', { static: false })
    public _fileBrowser: TerraFileBrowserComponent;

    @ViewChild('fileBrowserDialog', { static: true })
    public _fileBrowserDialog: TemplateRef<any>;

    @ViewChild('imagePreviewDialog', { static: true })
    public _imagePreviewDialog: TemplateRef<{ filename: string; filepath: string }>;

    public _selectedObject: TerraStorageObject;

    public _id: string;
    public _translationPrefix: string = 'terraFileInput';

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale, private _dialog: MatDialog) {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `file-input_#${nextId++}`;
    }

    public onObjectSelected(selectedObject: TerraStorageObject): void {
        this.value = selectedObject.publicUrl;
    }

    public onPreviewClicked(): void {
        if (this.isWebImage(this.value)) {
            this._dialog.open(this._imagePreviewDialog, {
                data: {
                    filepath: this.value,
                    filename: this.getFilename(this.value)
                }
            });
        }
    }

    public getIconClass(filename: string): string {
        if (filename === null || filename === undefined) {
            return '';
        }

        if (PathHelper.isDirectory(filename)) {
            return 'icon-folder';
        }
        return FileTypeHelper.mapIconClass(filename);
    }

    public isWebImage(filename: string): boolean {
        return !StringHelper.isNullUndefinedOrEmpty(filename) && FileTypeHelper.isWebImage(filename);
    }

    public getFilename(path: string): string {
        if (path === null || path === undefined) {
            return '';
        }
        return PathHelper.basename(path);
    }

    public resetValue(): void {
        this.value = '';
    }

    public openFileBrowserDialog(): void {
        const dialogRef: MatDialogRef<any> = this._dialog.open(this._fileBrowserDialog, {
            autoFocus: false
        });

        dialogRef.afterOpened().subscribe(() => {
            this._fileBrowser.selectUrl(this.value);
        });

        dialogRef.afterClosed().subscribe((result: TerraStorageObject) => {
            if (result) {
                this.onObjectSelected(this._selectedObject);
            }
        });
    }

    public onSelectedObjectChange(selectedObject: TerraStorageObject): void {
        // workaround since change detection is not finished when selectedObject is set
        setTimeout(() => (this._selectedObject = selectedObject));
    }
}
