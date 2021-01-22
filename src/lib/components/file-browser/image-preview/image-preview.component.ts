import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { TerraStorageObject } from '../model/terra-storage-object';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraImageMetadata } from '../model/terra-image-metadata.interface';
import { isNullOrUndefined } from 'util';
import { TerraBaseMetadataStorageService } from '../terra-base-metadata-storage.interface';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';

@Component({
    selector: 'terra-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss']
})
export class TerraImagePreviewComponent {
    @Input()
    public inputStorageService: TerraBaseStorageService;

    public _translationPrefix: string = 'terraFileBrowser';
    public _metadata: TerraImageMetadata = {};
    public _isLoading: boolean = true;
    private _inputStorageObject: TerraStorageObject;

    @Input()
    public set inputStorageObject(object: TerraStorageObject) {
        this._inputStorageObject = object;
        this._metadata = {};
        this._isLoading = true;
        if (
            !isNullOrUndefined(object) &&
            this.inputStorageService &&
            this.inputStorageService instanceof TerraBaseMetadataStorageService
        ) {
            this.inputStorageService.getMetadata(object.key).subscribe((data: TerraImageMetadata) => {
                this._metadata = data;
                this._isLoading = false;
                this._changeDetector.detectChanges();
            });
        } else {
            this._isLoading = false;
        }
    }

    public get inputStorageObject(): TerraStorageObject {
        return this._inputStorageObject;
    }

    public get _canHandleMetadata(): boolean {
        return this.inputStorageService instanceof TerraBaseMetadataStorageService;
    }

    constructor(
        @Inject(L10N_LOCALE) public _locale: L10nLocale,
        private _changeDetector: ChangeDetectorRef,
        private _translation: L10nTranslationService
    ) {}

    public _updateMetadata(): void {
        if (this.inputStorageService instanceof TerraBaseMetadataStorageService) {
            this.inputStorageService.updateMetadata(this.inputStorageObject.key, this._metadata).subscribe(() => {
                this._translation.translate(this._translationPrefix + '.metadataUpdated');
            });
        }
    }
}
