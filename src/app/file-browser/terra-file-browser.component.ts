import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { TerraFrontendStorageService } from './terra-frontend-storage.service';
import { TerraStorageObject } from './model/terra-storage-object';
import { FileBrowserSplitConfig } from './config/file-browser-split.config';
import { TerraBaseStorageService } from './terra-base-storage.interface';
import { isNullOrUndefined } from 'util';

@Component({
    selector:  'terra-file-browser',
    template:  require('./terra-file-browser.component.html'),
    providers: [FileBrowserSplitConfig],
    styles:    [
        require('./terra-file-browser.component.scss'),
        require('./terra-file-browser.component.glob.scss').toString()
    ]
})
export class TerraFileBrowserComponent implements OnInit
{
    @Input() public inputAllowedExtensions:Array<string> = [];

    @Input() public inputAllowFolders:boolean = true;

    @Output() public outputSelectedChange:EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public onSelectedUrlChange:EventEmitter<string> = new EventEmitter();

    private _storageServices:Array<TerraBaseStorageService>;

    @Input()
    public set inputStorageServices(services:Array<TerraBaseStorageService>)
    {
        this._storageServices = services;
    }

    public get inputStorageServices():Array<TerraBaseStorageService>
    {
        if(!isNullOrUndefined(this._storageServices) && this._storageServices.length > 0)
        {
            return this._storageServices;
        }

        return [this._frontendStorageService]
    }

    constructor(public splitConfig:FileBrowserSplitConfig,
                private _frontendStorageService:TerraFrontendStorageService)
    {
    }

    public ngOnInit():void
    {
        this.splitConfig.init(this.inputStorageServices);
    }

    public selectUrl(publicUrl:string):void
    {
        this.onSelectedUrlChange.emit(publicUrl);
    }
}
