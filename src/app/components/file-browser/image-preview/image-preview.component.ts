import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraStorageObject } from '../model/terra-storage-object';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraImageMetadata } from '../model/terra-image-metadata.interface';
import { isNullOrUndefined } from 'util';
import { TerraBaseMetadataStorageService } from '../terra-base-metadata-storage.interface';
import {
    Language,
    TranslationService
} from 'angular-l10n';

@Component({
    selector: 'terra-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: [ './image-preview.component.scss']
})
export class TerraImagePreviewComponent implements OnInit, OnDestroy
{
    @Input()
    public inputStorageService:TerraBaseStorageService;

    @Language()
    protected lang:string;

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
                this.changeDetector.detectChanges();
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

    constructor(private changeDetector:ChangeDetectorRef,
                private translation:TranslationService)
    {
    }

    public ngOnInit():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnDestroy():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    protected updateMetadata():void
    {
        if(this.inputStorageService instanceof TerraBaseMetadataStorageService)
        {
            this.inputStorageService
                .updateMetadata(this.inputStorageObject.key, this.metadata)
                .subscribe(() =>
                {
                    this.translation.translate(this.translationPrefix + '.metadataUpdated');
                });
        }
    }
}
