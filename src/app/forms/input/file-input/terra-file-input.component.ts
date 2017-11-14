import {
    Component,
    forwardRef,
    Input,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '../../../overlay/terra-overlay.component';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraRegex } from '../../../regex/terra-regex';
import { TerraOverlayButtonInterface } from '../../../overlay/data/terra-overlay-button.interface';
import { PathHelper } from '../../../file-browser/helper/path.helper';
import { FileType } from '../../../file-browser/helper/fileType.helper';
import { TranslationService } from 'angular-l10n';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { TerraFrontendStorageService } from '../../../file-browser/terra-frontend-storage.service';
import { isNullOrUndefined } from 'util';

@Component({
    selector:  'terra-file-input',
    template:  require('./terra-file-input.component.html'),
    styles:    [require('./terra-file-input.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFileInputComponent),
            multi:       true
        }
    ]
})
export class TerraFileInputComponent extends TerraInputComponent
{
    private _translationPrefix:string = 'terraFileInput';

    @Input()
    public inputShowPreview:boolean = false;

    @Input()
    public inputAllowedExtensions:string[] = [];

    @Input()
    public inputAllowFolders:boolean = true;

    private _storageServices:Array<TerraBaseStorageService>;

    @Input()
    public set inputStorageServices(services:Array<TerraBaseStorageService>)
    {
        this._storageServices = services;
    }

    public get inputStorageServices():Array<TerraBaseStorageService>
    {
        return this._storageServices || [this._frontendStorageService];
    }

    @ViewChild('overlay')
    public overlay:TerraOverlayComponent;

    @ViewChild('previewOverlay')
    public previewOverlay:TerraOverlayComponent;

    private _selectedObjectUrl:string;

    public primaryOverlayButton:TerraOverlayButtonInterface = {
        icon:          'icon-success',
        caption:       this.translation.translate(this._translationPrefix + '.choose'),
        isDisabled:    true,
        clickFunction: () =>
                       {
                           this.value = this._selectedObjectUrl;
                           this.overlay.hideOverlay();
                       }
    };

    public secondaryOverlayButton:TerraOverlayButtonInterface = {
        icon:          'icon-close',
        caption:       this.translation.translate(this._translationPrefix + '.cancel'),
        isDisabled:    false,
        clickFunction: () =>
                       {
                           this._selectedObjectUrl = this.value;
                           this.overlay.hideOverlay();
                       }
    };

    constructor(private translation:TranslationService, private _frontendStorageService:TerraFrontendStorageService)
    {
        super(TerraRegex.MIXED);
    }

    public ngOnInit():void
    {
    }

    public onSelectedObjectChange(selectedObject:TerraStorageObject):void
    {
        if(isNullOrUndefined(selectedObject) || selectedObject.isDirectory)
        {
            this.primaryOverlayButton.isDisabled = true;
        }
        else
        {
            this.primaryOverlayButton.isDisabled = false;
            this._selectedObjectUrl = selectedObject.publicUrl;
        }
    }

    public onPreviewClicked():void
    {
        if(this.isWebImage(this.value))
        {
            this.previewOverlay.showOverlay();
        }
    }

    public showFileBrowser():void
    {
        this.overlay.showOverlay();
    }

    public getIconClass(filename:string):string
    {
        if(isNullOrUndefined(filename))
        {
            return '';
        }

        if(PathHelper.isDirectory(filename))
        {
            return 'icon-folder';
        }
        return FileType.mapIconClass(filename);
    }

    public isWebImage(filename:string):boolean
    {
        return !isNullOrUndefined(filename) && FileType.isWebImage(filename);
    }

    public getFilename(path:string):string
    {
        if(isNullOrUndefined(path))
        {
            return '';
        }
        return PathHelper.basename(path);
    }
}
