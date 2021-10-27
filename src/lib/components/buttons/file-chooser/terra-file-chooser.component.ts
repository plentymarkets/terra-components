import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { L10nTranslationService } from 'angular-l10n';
import { TerraFileBrowserComponent } from '../../file-browser/terra-file-browser.component';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraBaseStorageService } from '../../file-browser/terra-base-storage.interface';
import { TerraStorageObject } from '../../file-browser/model/terra-storage-object';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

    @ViewChild(TemplateRef, { static: true })
    public dialogTemplateRef: TemplateRef<any>;

    public _selectedObject: TerraStorageObject;

    private _translationPrefix: string = 'terraFileInput';

    private _primaryBrowserButtonCaption: string = '';

    private _secondaryBrowserButtonCaption: string = '';

    constructor(private _translation: L10nTranslationService, private _dialog: MatDialog) {
        super();
    }

    public onClick(event: Event): void {
        this.outputClicked.emit(event);
        const dialogRef: MatDialogRef<any> = this._dialog.open(this.dialogTemplateRef, {
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
