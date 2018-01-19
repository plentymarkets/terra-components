import {
    ChangeDetectorRef,
    Component,
    Input
} from '@angular/core';
import { TerraStorageObject } from '../model/terra-storage-object';
import {
    TerraBaseMetadataStorageService,
    TerraBaseStorageService
} from '../terra-base-storage.interface';
import { TerraImageMetadata } from '../model/terra-image-metadata.interface';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-image-preview',
    template: require('./image-preview.component.html'),
    styles:   [require('./image-preview.component.scss')]
})
export class TerraImagePreviewComponent
{
    private _translationPrefix:string = 'terraFileBrowser';

    private _inputStorageObject:TerraStorageObject;

    @Input()
    public set inputStorageObject(object:TerraStorageObject)
    {
        this._inputStorageObject = object;
        this._metadata = {};
        this._isLoading = true;
        if(!isNullOrUndefined(object) && this.inputStorageService && this.inputStorageService instanceof TerraBaseMetadataStorageService)
        {
            this.inputStorageService.getMetadata(object.key).subscribe((data:TerraImageMetadata) =>
            {
                this._metadata = data;
                this._isLoading = false;
                this._changeDetector.detectChanges();
            });
        }
        else
        {
            this._isLoading = false;
        }
    }

    public get inputStorageObject():TerraStorageObject
    {
        return this._inputStorageObject;
    }

    @Input()
    public inputStorageService:TerraBaseStorageService;

    private get _canHandleMetadata():boolean
    {
        return this.inputStorageService instanceof TerraBaseMetadataStorageService;
    }

    private _metadata:TerraImageMetadata = {};

    private _isLoading:boolean = true;

    constructor(private _changeDetector:ChangeDetectorRef)
    {
    }

    private updateMetadata():void
    {
        if(this.inputStorageService instanceof TerraBaseMetadataStorageService)
        {
            this.inputStorageService.updateMetadata(this.inputStorageObject.key, this._metadata);
        }
    }
}
