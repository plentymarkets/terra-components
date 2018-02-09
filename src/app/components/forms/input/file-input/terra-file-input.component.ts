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
import {
    FileType,
    PathHelper,
    TerraBaseStorageService,
    TerraFrontendStorageService,
    TerraOverlayButtonInterface,
    TerraOverlayComponent,
    TerraRegex,
    TerraStorageObject
} from '../../../../../';

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
    private _id:string;

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

        // generate the id of the input instance
        this._id = `file-input_#${nextId++}`;
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
