import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
    TerraButtonComponent, TerraOverlayButtonInterface, TerraOverlayComponent,
    TerraStorageObject, TerraBaseStorageService, TerraFrontendStorageService
} from '../../../../';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { TerraFileBrowserComponent } from '../../file-browser/terra-file-browser.component';

@Component({
    selector: 'terra-file-chooser',
    template: require('./terra-file-chooser.component.html'),
    styles: [require('./terra-file-chooser.component.scss')]
})
export class TerraFileChooserComponent extends TerraButtonComponent
{
    @Input()
    public set inputPrimaryBrowserCaption(value:string)
    {
        this._primaryBrowserCaption = value;
    }

    public get inputPrimaryBrowserCaption():string
    {
        if ( !isNullOrUndefined(this._primaryBrowserCaption) && this._primaryBrowserCaption.length > 0)
        {
            return this._primaryBrowserCaption;
        }

        return this.translation.translate(this._translationPrefix + '.choose');
    }

    @Input()
    public set inputSecondaryBrowserCaption(value:string)
    {
        this._primaryBrowserCaption = value;
    }

    public get inputSecondaryBrowserCaption():string
    {
        if ( !isNullOrUndefined(this._secondaryBrowserCaption) && this._secondaryBrowserCaption.length > 0)
        {
            return this._secondaryBrowserCaption;
        }

        return this.translation.translate(this._translationPrefix + '.cancel');
    }

    @Input()
    public inputAllowedExtensions:string[] = [];

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

    @Output()
    public outputSelected:EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    @Output()
    public outputCancelled:EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public outputFileBrowserShow:EventEmitter<TerraFileBrowserComponent> = new EventEmitter<TerraFileBrowserComponent>();

    @Output()
    public outputFileBrowserHide:EventEmitter<TerraFileBrowserComponent> = new EventEmitter<TerraFileBrowserComponent>();

    @ViewChild('overlay')
    public overlay:TerraOverlayComponent;

    @ViewChild('fileBrowser')
    public fileBrowser:TerraFileBrowserComponent;

    public primaryOverlayButton:TerraOverlayButtonInterface;

    public secondaryOverlayButton:TerraOverlayButtonInterface;

    private _translationPrefix:string = 'terraFileInput';

    private _primaryBrowserCaption:string = '';

    private _secondaryBrowserCaption:string = '';

    private _selectedObject:TerraStorageObject;

    private _storageServices:Array<TerraBaseStorageService>;

    constructor(private translation:TranslationService, private _frontendStorageService:TerraFrontendStorageService)
    {
        super();

        this.primaryOverlayButton = {
            icon:          'icon-success',
            caption:       this.inputPrimaryBrowserCaption,
            isDisabled:    true,
            clickFunction: ():void =>
            {
                this.outputSelected.emit(this._selectedObject);
                this.overlay.hideOverlay();
            }
        };

        this.secondaryOverlayButton = {
            icon: 'icon-close',
            caption: this.inputSecondaryBrowserCaption,
            isDisabled: false,
            clickFunction: ():void =>
            {
                this.outputCancelled.emit();
                this.overlay.hideOverlay();
            }
        };
    }

    public onClick(event:Event):void
    {
        this.outputClicked.emit(event);
        this.overlay.showOverlay();
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
            this._selectedObject = selectedObject;
        }
    }

    public onBrowserShow():void
    {
        this.outputFileBrowserShow.emit(this.fileBrowser);
    }

    public onBrowserHide():void
    {
        this.outputFileBrowserHide.emit(this.fileBrowser);
    }
}
