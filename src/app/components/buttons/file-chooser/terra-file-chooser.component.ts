import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { TerraFileBrowserComponent } from '../../file-browser/terra-file-browser.component';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraBaseStorageService } from '../../file-browser/terra-base-storage.interface';
import { TerraStorageObject } from '../../file-browser/model/terra-storage-object';
import { TerraOverlayComponent } from '../../layouts/overlay/terra-overlay.component';
import { TerraOverlayButtonInterface } from '../../layouts/overlay/data/terra-overlay-button.interface';
import { TerraFrontendStorageService } from '../../file-browser/terra-frontend-storage.service';

@Component({
    selector: 'terra-file-chooser',
    template: require('./terra-file-chooser.component.html'),
    styles: [require('./terra-file-chooser.component.scss')]
})
export class TerraFileChooserComponent extends TerraButtonComponent
{
    @Input()
    public set inputPrimaryBrowserButtonCaption(value:string)
    {
        this.primaryBrowserButtonCaption = value;
    }

    public get inputPrimaryBrowserButtonCaption():string
    {
        if ( !isNullOrUndefined(this.primaryBrowserButtonCaption) && this.primaryBrowserButtonCaption.length > 0)
        {
            return this.primaryBrowserButtonCaption;
        }

        return this.translation.translate(this.translationPrefix + '.choose');
    }

    @Input()
    public set inputSecondaryBrowserButtonCaption(value:string)
    {
        this.primaryBrowserButtonCaption = value;
    }

    public get inputSecondaryBrowserButtonCaption():string
    {
        if ( !isNullOrUndefined(this.secondaryBrowserButtonCaption) && this.secondaryBrowserButtonCaption.length > 0)
        {
            return this.secondaryBrowserButtonCaption;
        }

        return this.translation.translate(this.translationPrefix + '.cancel');
    }

    @Input()
    public inputAllowedExtensions:Array<string> = [];

    @Input()
    public inputAllowFolders:boolean = true;

    @Input()
    public set inputStorageServices(services:Array<TerraBaseStorageService>)
    {
        this.storageServices = services;
    }

    public get inputStorageServices():Array<TerraBaseStorageService>
    {
        return this.storageServices || [this.frontendStorageService];
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

    private translationPrefix:string = 'terraFileInput';

    private primaryBrowserButtonCaption:string = '';

    private secondaryBrowserButtonCaption:string = '';

    private selectedObject:TerraStorageObject;

    private storageServices:Array<TerraBaseStorageService>;

    constructor(private translation:TranslationService, private frontendStorageService:TerraFrontendStorageService)
    {
        super();

        this.primaryOverlayButton = {
            icon:          'icon-success',
            caption:       this.inputPrimaryBrowserButtonCaption,
            isDisabled:    true,
            clickFunction: ():void =>
            {
                this.outputSelected.emit(this.selectedObject);
                this.overlay.hideOverlay();
            }
        };

        this.secondaryOverlayButton = {
            icon: 'icon-close',
            caption: this.inputSecondaryBrowserButtonCaption,
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
            this.selectedObject = selectedObject;
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
