import {
    Component,
    forwardRef,
    Input,
    ViewChild
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraInputComponent } from '../terra-input.component';
import { PathHelper } from '../../../../helpers/path.helper';
import { FileTypeHelper } from '../../../../helpers/fileType.helper';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { TerraFrontendStorageService } from '../../../file-browser/terra-frontend-storage.service';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { TerraOverlayComponent } from '../../../layouts/overlay/terra-overlay.component';
import { TerraOverlayButtonInterface } from '../../../layouts/overlay/data/terra-overlay-button.interface';

let nextId:number = 0;

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
    @Input()
    public inputShowPreview:boolean = false;

    @Input()
    public inputAllowedExtensions:Array<string> = [];

    @Input()
    public inputAllowFolders:boolean = true;

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

    public primaryOverlayButton:TerraOverlayButtonInterface;
    public secondaryOverlayButton:TerraOverlayButtonInterface;

    private _translationPrefix:string = 'terraFileInput';
    private _storageServices:Array<TerraBaseStorageService>;
    private _id:string;

    constructor(private translation:TranslationService, private _frontendStorageService:TerraFrontendStorageService)
    {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `file-input_#${nextId++}`;
    }

    public onObjectSelected(selectedObject:TerraStorageObject):void
    {
        this.value = selectedObject.publicUrl;
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
        return FileTypeHelper.mapIconClass(filename);
    }

    public isWebImage(filename:string):boolean
    {
        return !isNullOrUndefined(filename) && FileTypeHelper.isWebImage(filename);
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
