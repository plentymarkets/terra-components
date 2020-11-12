import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraInputComponent } from '../terra-input.component';
import { PathHelper } from '../../../../helpers/path.helper';
import { FileTypeHelper } from '../../../../helpers/fileType.helper';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { StringHelper } from '../../../../helpers/string.helper';
import { Language } from 'angular-l10n';
import { MatDialog } from '@angular/material/dialog';

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
export class TerraFileInputComponent extends TerraInputComponent implements OnInit, OnDestroy {
    @Input()
    public inputShowPreview: boolean = false;

    @Input()
    public inputAllowedExtensions: Array<string> = [];

    @Input()
    public inputAllowFolders: boolean = true;

    @Input()
    public set inputStorageServices(services: Array<TerraBaseStorageService>) {
        this._storageServices = services;
    }

    public get inputStorageServices(): Array<TerraBaseStorageService> {
        return this._storageServices;
    }

    @ViewChild('imagePreviewDialog', { static: true })
    public _imagePreviewDialog: TemplateRef<{ filename: string; filepath: string }>;

    @Language()
    public _lang: string;

    public _id: string;
    public _translationPrefix: string = 'terraFileInput';

    private _storageServices: Array<TerraBaseStorageService>;

    constructor(
        /** Instance of the dialog service */
        private dialog: MatDialog
    ) {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `file-input_#${nextId++}`;
    }

    public ngOnInit(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
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
}
