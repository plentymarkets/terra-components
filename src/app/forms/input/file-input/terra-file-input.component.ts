import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { TerraOverlayComponent } from "../../../overlay/terra-overlay.component";
import { TerraInputComponent } from "../terra-input.component";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TerraRegex } from "../../../regex/terra-regex";
import { TerraOverlayButtonInterface } from "../../../overlay/data/terra-overlay-button.interface";
import { PathHelper } from "../../../file-browser/helper/path.helper";
import { FileType } from "../../../file-browser/helper/fileType.helper";
import { TranslationService } from "angular-l10n";
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { TerraFileBrowserComponent } from '../../../file-browser/terra-file-browser.component';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';
import { TerraFrontendStorageService } from '../../../file-browser/terra-frontend-storage.service';

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
    private _translationPrefix:string = "terraFileInput";

    @Input()
    public inputShowPreview:boolean = false;

    @Input()
    public inputAllowedExtensions:string[] = [];

    @Input()
    public inputAllowFolders:boolean = true;

    private _storageService: TerraBaseStorageService;

    @Input()
    public set inputStorageService( service: TerraBaseStorageService )
    {
        this._storageService = service;
    }

    public get inputStorageService(): TerraBaseStorageService
    {
        return this._storageService || this._frontendStorageService;
    }

    @ViewChild('overlay')
    public overlay:TerraOverlayComponent;

    @ViewChild('previewOverlay')
    public previewOverlay:TerraOverlayComponent;

    private _selectedObjectUrl:string;
    
    public primaryOverlayButton:TerraOverlayButtonInterface = {
        icon:          'icon-success',
        caption:       this.translation.translate(this._translationPrefix + ".choose"),
        isDisabled:    true,
        clickFunction: () => {
                           this.value = this._selectedObjectUrl;
                           this.overlay.hideOverlay();
                       }
    };

    public secondaryOverlayButton:TerraOverlayButtonInterface = {
        icon:          'icon-close',
        caption:       this.translation.translate(this._translationPrefix + ".cancel"),
        isDisabled:    false,
        clickFunction: () => {
                           this._selectedObjectUrl = this.value;
                           this.overlay.hideOverlay();
                       }
    };

    constructor(private translation:TranslationService, private _frontendStorageService: TerraFrontendStorageService )
    {
        super(TerraRegex.MIXED);
    }

    public ngOnInit():void
    {
    }

    public onSelectedObjectChange( selectedObject: TerraStorageObject )
    {
        if ( !selectedObject || selectedObject.isDirectory )
        {
            this.primaryOverlayButton.isDisabled = true;
        }
        else
        {
            this.primaryOverlayButton.isDisabled = false;
            this._selectedObjectUrl = selectedObject.publicUrl;
        }
    }

    public onPreviewClicked()
    {
        if(this.isWebImage(this.value))
        {
            this.previewOverlay.showOverlay();
        }
    }

    public showFileBrowser()
    {
        this.overlay.showOverlay();
    }

    public getIconClass(filename:string):string
    {
        if(!filename)
        {
            return "";
        }

        if(PathHelper.isDirectory(filename))
        {
            return "icon-folder";
        }
        return FileType.mapIconClass(filename);
    }

    public isWebImage(filename:string):boolean
    {
        return !!filename && FileType.isWebImage(filename);
    }

    public getFilename(path:string):string
    {
        if(!path)
        {
            return "";
        }
        return PathHelper.basename(path);
    }
}
