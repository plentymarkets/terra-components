import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraInputComponent } from '../terra-input.component';
import { PathHelper } from '../../../../helpers/path.helper';
import { FileTypeHelper } from '../../../../helpers/fileType.helper';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { StringHelper } from '../../../../helpers/string.helper';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
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
    public set inputPrimaryBrowserButtonCaption(value: string) {
        this._primaryBrowserButtonCaption = value;
    }

    public get inputPrimaryBrowserButtonCaption(): string {
        return this._primaryBrowserButtonCaption || this._translation.translate(this._translationPrefix + '.choose');
    }

    @Input()
    public set inputSecondaryBrowserButtonCaption(value: string) {
        this._primaryBrowserButtonCaption = value;
    }

    public get inputSecondaryBrowserButtonCaption(): string {
        return this._secondaryBrowserButtonCaption || this._translation.translate(this._translationPrefix + '.cancel');
    }

    @Input()
    public inputAllowedExtensions: Array<string> = [];

    @Input()
    public inputAllowFolders: boolean = true;

    @Input()
    public inputStorageServices: Array<TerraBaseStorageService>;

    @Output()
    public outputSelected: EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    @Output()
    public outputCancelled: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public outputFileBrowserShow: EventEmitter<TerraFileBrowserComponent> = new EventEmitter<
        TerraFileBrowserComponent
    >();

    @Output()
    public outputFileBrowserHide: EventEmitter<TerraFileBrowserComponent> = new EventEmitter<
        TerraFileBrowserComponent
    >();

    @ViewChild('fileBrowser', { static: false })
    public fileBrowser: TerraFileBrowserComponent;

    @ViewChild('fileBrowserDialog', { static: true })
    public dialogTemplateRef: TemplateRef<any>;

    @ViewChild('imagePreviewDialog', { static: true })
    public _imagePreviewDialog: TemplateRef<{ filename: string; filepath: string }>;

    public _selectedObject: TerraStorageObject;

    public _id: string;
    public _translationPrefix: string = 'terraFileInput';

    private _primaryBrowserButtonCaption: string = '';

    private _secondaryBrowserButtonCaption: string = '';

    private _storageServices: Array<TerraBaseStorageService>;

    constructor(
        @Inject(L10N_LOCALE) public _locale: L10nLocale,
        /** Instance of the dialog service */
        private dialog: MatDialog,
        private _translation: L10nTranslationService
    ) {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `file-input_#${nextId++}`;
    }

    public onObjectSelected(selectedObject: TerraStorageObject): void {
        this.value = selectedObject.publicUrl;
    }

    public onPreviewClicked(): void {
        if (this.isWebImage(this.value)) {
            this.dialog.open(this._imagePreviewDialog, {
                data: {
                    filepath: this.value,
                    filename: this.getFilename(this.value)
                }
            });
        }
    }

    public getIconClass(filename: string): string {
        if (isNullOrUndefined(filename)) {
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
        if (isNullOrUndefined(path)) {
            return '';
        }
        return PathHelper.basename(path);
    }

    public resetValue(): void {
        this.value = '';
    }

    public onClick(): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(this.dialogTemplateRef, {
            autoFocus: false
        });
        dialogRef.afterOpened().subscribe(() => {
            this.onBrowserShow();
        });

        dialogRef.afterClosed().subscribe((result: TerraStorageObject) => {
            result ? this.outputSelected.emit(this._selectedObject) : this.outputCancelled.emit();
            this.onBrowserHide();
        });
    }

    public onSelectedObjectChange(selectedObject: TerraStorageObject): void {
        // workaround since change detection is not finished when selectedObject is set
        setTimeout(() => (this._selectedObject = selectedObject));
    }

    public onBrowserShow(): void {
        this.outputFileBrowserShow.emit(this.fileBrowser);
    }

    public onBrowserHide(): void {
        this.outputFileBrowserHide.emit(this.fileBrowser);
    }
}
