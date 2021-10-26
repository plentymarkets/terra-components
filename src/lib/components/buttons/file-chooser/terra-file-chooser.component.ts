import { Component, EventEmitter, Input, Output } from '@angular/core';
import { L10nTranslationService } from 'angular-l10n';
import { TerraFileBrowserComponent } from '../../file-browser/terra-file-browser.component';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraBaseStorageService } from '../../file-browser/terra-base-storage.interface';
import { TerraStorageObject } from '../../file-browser/model/terra-storage-object';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileChooserDialogComponent } from './file-chooser-dialog/file-chooser-dialog.component';

/**
 * @deprecated since v11. Use material's [button]{@link https://material.angular.io/components/button}
 * and [dialog]{@link https://material.angular.io/components/dialog}
 * in conjunction with our [file-browser]{@link TerraFileBrowserComponent } instead.
 */
@Component({
    selector: 'terra-file-chooser',
    templateUrl: './terra-file-chooser.component.html',
    styleUrls: ['./terra-file-chooser.component.scss']
})
export class TerraFileChooserComponent extends TerraButtonComponent {
    @Input()
    public set inputPrimaryBrowserButtonCaption(value: string) {
        this._primaryBrowserButtonCaption = value;
    }

    public get inputPrimaryBrowserButtonCaption(): string {
        if (
            (!(this._primaryBrowserButtonCaption === null) || this._primaryBrowserButtonCaption === undefined) &&
            this._primaryBrowserButtonCaption.length > 0
        ) {
            return this._primaryBrowserButtonCaption;
        }

        return this._translation.translate(this._translationPrefix + '.choose');
    }

    @Input()
    public set inputSecondaryBrowserButtonCaption(value: string) {
        this._primaryBrowserButtonCaption = value;
    }

    public get inputSecondaryBrowserButtonCaption(): string {
        if (
            (!(this._secondaryBrowserButtonCaption === null) || this._secondaryBrowserButtonCaption === undefined) &&
            this._secondaryBrowserButtonCaption.length > 0
        ) {
            return this._secondaryBrowserButtonCaption;
        }

        return this._translation.translate(this._translationPrefix + '.cancel');
    }

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

    @Output()
    public outputSelected: EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    // @Output()
    // public outputFileBrowserShow: EventEmitter<TerraFileBrowserComponent> = new EventEmitter<
    //     TerraFileBrowserComponent
    // >();
    //
    // @Output()
    // public outputFileBrowserHide: EventEmitter<TerraFileBrowserComponent> = new EventEmitter<
    //     TerraFileBrowserComponent
    // >();

    private _translationPrefix: string = 'terraFileInput';

    private _primaryBrowserButtonCaption: string = '';

    private _secondaryBrowserButtonCaption: string = '';

    private _selectedObject: TerraStorageObject;

    private _storageServices: Array<TerraBaseStorageService>;

    constructor(private _translation: L10nTranslationService, private _dialog: MatDialog) {
        super();
    }

    public onClick(event: Event): void {
        this.outputClicked.emit(event);
        const dialogRef: MatDialogRef<FileChooserDialogComponent> = this._dialog.open(FileChooserDialogComponent, {
            // disableClose: true,
            autoFocus: false,
            data: {
                primaryBrowserButtonCaption: this._primaryBrowserButtonCaption,
                secondaryBrowserButtonCaption: this._secondaryBrowserButtonCaption,
                inputAllowedExtensions: this.inputAllowedExtensions,
                inputAllowFolders: this.inputAllowFolders,
                inputStorageServices: this.inputStorageServices,
                onSelectedObjectChange: () => this.onSelectedObjectChange(this._selectedObject)
            }
        });

        dialogRef.afterClosed().subscribe((result: TerraStorageObject) => {
            if (result) {
                this.outputSelected.emit(this._selectedObject);
            }
        });
    }

    public onSelectedObjectChange(selectedObject: TerraStorageObject): void {
        this._selectedObject = selectedObject;
    }
}
