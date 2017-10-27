import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { TerraStorageObject } from '../model/terra-storage-object';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraImageMetadata } from '../model/terra-image-metadata.interface';

@Component({
               selector: 'terra-image-preview',
               template: require('./image-preview.component.html'),
               styles: [require('./image-preview.component.scss')]
           })
export class TerraImagePreviewComponent
{

    private _inputStorageObject: TerraStorageObject;

    @Input()
    public set inputStorageObject( object: TerraStorageObject )
    {
        this._inputStorageObject = object;
        this._metadata = {};
        this._isLoading = true;
        if ( object && this.inputStorageService )
        {
            this.inputStorageService
                .getMetadata( object.key )
                .subscribe((data: TerraImageMetadata) => {
                    this._metadata = data;
                    this._isLoading = false;
                    this._changeDetector.detectChanges();
                });
        }
    }

    public get inputStorageObject(): TerraStorageObject
    {
        return this._inputStorageObject;
    }

    @Input()
    public inputStorageService: TerraBaseStorageService;

    private _metadata: TerraImageMetadata = {};

    private _isLoading: boolean = true;

    constructor( private _changeDetector: ChangeDetectorRef )
    {
    }

    private updateMetadata()
    {
        this.inputStorageService.updateMetadata( this.inputStorageObject.key, this._metadata );
    }
}