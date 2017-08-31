import { Component, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { TerraOverlayComponent } from "../../../overlay/terra-overlay.component";
import { TerraInputComponent } from "../terra-input.component";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TerraRegex } from "../../../regex/terra-regex";
import { TerraOverlayButtonInterface } from "../../../overlay/data/terra-overlay-button.interface";
import { PathHelper } from "../../../file-browser/helper/path.helper";
import { FileType } from "../../../file-browser/helper/fileType.helper";

@Component({
    selector: 'terra-file-input',
    template: require('./terra-file-input.component.html'),
    styles: [require('./terra-file-input.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraFileInputComponent),
            multi:       true
        }
    ]
})
export class TerraFileInputComponent extends TerraInputComponent implements OnInit
{
    @Input()
    public inputShowPreview: boolean = false;

    @Input()
    public inputAllowedExtensions: string[] = [];

    @ViewChild('overlay')
    public overlay: TerraOverlayComponent;

    private _selectedUrl: string;

    public get selectedUrl(): string
    {
        return this._selectedUrl;
    }

    public set selectedUrl( value: string )
    {
        this.primaryOverlayButton.isDisabled = !value || value.length <= 0;

        this._selectedUrl = value;
    }

    public primaryOverlayButton: TerraOverlayButtonInterface = {
        icon: 'icon-success',
        caption: 'auswählen',
        isDisabled: true,
        clickFunction: () => {
            this.value = this.selectedUrl;
            this.overlay.hideOverlay();
        }
    };

    public secondaryOverlayButton: TerraOverlayButtonInterface = {
        icon: 'icon-close',
        caption: 'abbrechen',
        isDisabled: false,
        clickFunction: () => {
            this.selectedUrl = this.value;
            this.overlay.hideOverlay();
        }
    };

    constructor()
    {
        super(TerraRegex.MIXED);
    }

    public ngOnInit(): void
    {
        this.selectedUrl = this.value;
    }

    public showFileBrowser()
    {
        this.overlay.showOverlay();
    }

    public getIconClass( filename: string ): string
    {
        if ( !filename )
        {
            return "";
        }

        if ( PathHelper.isDirectory( filename ) )
        {
            return "icon-folder";
        }
        return FileType.mapIconClass( filename );
    }

    public isWebImage( filename: string ): boolean
    {
        return !!filename && FileType.isWebImage( filename );
    }
}