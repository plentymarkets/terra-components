import { AfterViewInit, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { L10N_LOCALE, L10nLocale } from 'angular-l10n';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';

@Component({
    selector: 'tc-file-chooser-dialog',
    templateUrl: './file-chooser-dialog.component.html',
    styleUrls: ['./file-chooser-dialog.component.scss']
})
export class FileChooserDialogComponent implements OnInit {
    public _chooseButton: string;
    public _closeButton: string;
    public _lang: string;
    public _inputAllowedExtensions: Array<string> = [];
    public _inputAllowFolders: boolean = true;
    public _storageServices: Array<TerraBaseStorageService>;
    public _selectedObject: TerraStorageObject;

    public set inputStorageServices(services: Array<TerraBaseStorageService>) {
        this._storageServices = services;
    }
    public get inputStorageServices(): Array<TerraBaseStorageService> {
        return this._storageServices;
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(L10N_LOCALE) public locale: L10nLocale) {
        this._lang = locale.language;
    }

    public ngOnInit(): void {
        this._chooseButton = this.data.primaryBrowserButtonCaption;
        this._closeButton = this.data.secondaryBrowserButtonCaption;
        this._inputAllowedExtensions = this.data.inputAllowedExtensions;
        this._inputAllowFolders = this.data.inputAllowFolders;
        this._storageServices = this.data.inputStorageServices;
        this._onSelectedObjectChange = this.data.onSelectedObjectChange;
    }

    public _onSelectedObjectChange(selectedObject: TerraStorageObject): void {
        this._selectedObject = selectedObject;
    }
}
