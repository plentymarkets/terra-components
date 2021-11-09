import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { L10nTranslationService } from 'angular-l10n';
import { TerraFileBrowserComponent } from '../../file-browser/terra-file-browser.component';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraBaseStorageService } from '../../file-browser/terra-base-storage.interface';
import { TerraStorageObject } from '../../file-browser/model/terra-storage-object';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TerraOverlayButtonInterface } from '../../layouts/overlay/data/terra-overlay-button.interface';

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
    public _dialogTemplateRef: TemplateRef<any>;

    /** @deprecated since v12. */
    public primaryOverlayButton: TerraOverlayButtonInterface;

    /** @deprecated since v12. */
    public secondaryOverlayButton: TerraOverlayButtonInterface;

    public _translationPrefix: string = 'terraFileInput';

    public _selectedObject: TerraStorageObject;

    private _primaryBrowserButtonCaption: string = '';

    private _secondaryBrowserButtonCaption: string = '';

    constructor(private _translation: L10nTranslationService, private _dialog: MatDialog) {
        super();

        this.primaryOverlayButton = {
            icon: 'icon-success',
            caption: this.inputPrimaryBrowserButtonCaption,
            isDisabled: true,
            clickFunction: (): void => {
                this.outputSelected.emit(this._selectedObject);
            }
        };

        this.secondaryOverlayButton = {
            icon: 'icon-close',
            caption: this.inputSecondaryBrowserButtonCaption,
            isDisabled: false,
            clickFunction: (): void => {
                this.outputCancelled.emit();
            }
        };
    }

    public onClick(event: Event): void {
        this.outputClicked.emit(event);
        const dialogRef: MatDialogRef<any> = this._dialog.open(this._dialogTemplateRef);
        dialogRef.afterOpened().subscribe(() => {
            this.onBrowserShow();
        });
        dialogRef.afterClosed().subscribe(() => {
            this.onBrowserHide();
        });
    }

    public onSelectedObjectChange(selectedObject: TerraStorageObject): void {
        // workaround since change detection is not finished when selectedObject is set
        setTimeout(() => {
            if (!selectedObject || selectedObject.isDirectory) {
                this.primaryOverlayButton.isDisabled = true;
            } else {
                this.primaryOverlayButton.isDisabled = false;
                this._selectedObject = selectedObject;
            }
        });
    }

    public onBrowserShow(): void {
        this.outputFileBrowserShow.emit(this.fileBrowser);
    }

    public onBrowserHide(): void {
        this.outputFileBrowserHide.emit(this.fileBrowser);
    }
}
