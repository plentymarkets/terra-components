import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { L10nTranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { TerraFileBrowserComponent } from '../../file-browser/terra-file-browser.component';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraBaseStorageService } from '../../file-browser/terra-base-storage.interface';
import { TerraStorageObject } from '../../file-browser/model/terra-storage-object';
import { TerraOverlayComponent } from '../../layouts/overlay/terra-overlay.component';
import { TerraOverlayButtonInterface } from '../../layouts/overlay/data/terra-overlay-button.interface';

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
        if (!isNullOrUndefined(this._primaryBrowserButtonCaption) && this._primaryBrowserButtonCaption.length > 0) {
            return this._primaryBrowserButtonCaption;
        }

        return this._translation.translate(this._translationPrefix + '.choose');
    }

    @Input()
    public set inputSecondaryBrowserButtonCaption(value: string) {
        this._primaryBrowserButtonCaption = value;
    }

    public get inputSecondaryBrowserButtonCaption(): string {
        if (!isNullOrUndefined(this._secondaryBrowserButtonCaption) && this._secondaryBrowserButtonCaption.length > 0) {
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

    @ViewChild('overlay', { static: true })
    public overlay: TerraOverlayComponent;

    @ViewChild('fileBrowser', { static: true })
    public fileBrowser: TerraFileBrowserComponent;

    public primaryOverlayButton: TerraOverlayButtonInterface;

    public secondaryOverlayButton: TerraOverlayButtonInterface;

    private _translationPrefix: string = 'terraFileInput';

    private _primaryBrowserButtonCaption: string = '';

    private _secondaryBrowserButtonCaption: string = '';

    private _selectedObject: TerraStorageObject;

    private _storageServices: Array<TerraBaseStorageService>;

    constructor(private _translation: L10nTranslationService) {
        super();

        this.primaryOverlayButton = {
            icon: 'icon-success',
            caption: this.inputPrimaryBrowserButtonCaption,
            isDisabled: true,
            clickFunction: (): void => {
                this.outputSelected.emit(this._selectedObject);
                this.overlay.hideOverlay();
            }
        };

        this.secondaryOverlayButton = {
            icon: 'icon-close',
            caption: this.inputSecondaryBrowserButtonCaption,
            isDisabled: false,
            clickFunction: (): void => {
                this.outputCancelled.emit();
                this.overlay.hideOverlay();
            }
        };
    }

    public onClick(event: Event): void {
        this.outputClicked.emit(event);
        this.overlay.showOverlay();
    }

    public onSelectedObjectChange(selectedObject: TerraStorageObject): void {
        if (isNullOrUndefined(selectedObject) || selectedObject.isDirectory) {
            this.primaryOverlayButton.isDisabled = true;
        } else {
            this.primaryOverlayButton.isDisabled = false;
            this._selectedObject = selectedObject;
        }
    }

    public onBrowserShow(): void {
        this.outputFileBrowserShow.emit(this.fileBrowser);
    }

    public onBrowserHide(): void {
        this.outputFileBrowserHide.emit(this.fileBrowser);
    }
}
