import {
    ChangeDetectorRef,
    Component,
    Input
} from '@angular/core';
import { TerraStorageObject } from '../model/terra-storage-object';
import {
    TerraBaseStorageService
} from '../terra-base-storage.interface';
import { TerraImageMetadata } from '../model/terra-image-metadata.interface';
import { isNullOrUndefined } from 'util';
import { TerraBaseMetadataStorageService } from '../terra-base-metadata-storage.interface';

@Component({
    selector: 'terra-image-preview',
    template: require('./image-preview.component.html'),
    styles:   [require('./image-preview.component.scss')]
})
export class TerraImagePreviewComponent
{
    @Input()
    public inputStorageService:TerraBaseStorageService;

    protected translationPrefix:string = 'terraFileBrowser';

    protected metadata:TerraImageMetadata = {};

    protected isLoading:boolean = true;

    private _inputStorageObject:TerraStorageObject;

    @Input()
    public set inputStorageObject(object:TerraStorageObject)
    {
        this._inputStorageObject = object;
        this.metadata = {};
        this.isLoading = true;
        if(!isNullOrUndefined(object) && this.inputStorageService && this.inputStorageService instanceof TerraBaseMetadataStorageService)
        {
            this.inputStorageService.getMetadata(object.key).subscribe((data:TerraImageMetadata) =>
            {
                this.metadata = data;
                this.isLoading = false;
                this._changeDetector.detectChanges();
            });
        }
        else
        {
            this.isLoading = false;
        }
    }

    public get inputStorageObject():TerraStorageObject
    {
        return this._inputStorageObject;
    }

    protected get _canHandleMetadata():boolean
    {
        return this.inputStorageService instanceof TerraBaseMetadataStorageService;
    }

    constructor(private _changeDetector:ChangeDetectorRef)
    {
    }

    protected updateMetadata():void
    {
        if(this.inputStorageService instanceof TerraBaseMetadataStorageService)
        {
            this.inputStorageService.updateMetadata(this.inputStorageObject.key, this.metadata);
        }
    }
}
