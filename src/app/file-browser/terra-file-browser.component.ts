import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { TerraFrontendStorageService } from "./terra-frontend-storage.service";
import { TerraStorageObjectList } from "./model/terra-storage-object-list";
import { TerraStorageObject } from "./model/terra-storage-object";
import { PathHelper } from "./helper/path.helper";
import { TerraTextInputComponent } from "../forms/input/text-input/terra-text-input.component";
import { ClipboardHelper } from "./helper/clipboard.helper";
import { FileType } from "./helper/fileType.helper";
import * as moment from "moment";
import { TranslationService } from "angular-l10n";
import { Subscription } from "rxjs/Subscription";
import { FileBrowserSplitConfig } from './config/file-browser-split.config';
import { TerraBaseStorageService } from './terra-base-storage.interface';
import { TerraFileBrowserService } from './terra-file-browser.service';

@Component({
    selector: 'terra-file-browser',
    template: require('./terra-file-browser.component.html'),
    styles:   [require('./terra-file-browser.component.scss')],
    providers: [FileBrowserSplitConfig]
})
export class TerraFileBrowserComponent implements OnInit
{

    @Input()
    public inputAllowedExtensions:Array<string> = [];

    @Input()
    public inputAllowFolders:boolean = true;

    @Output()
    public outputSelectedChange:EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public onSelectedUrlChange: EventEmitter<string> = new EventEmitter();

    private _storageServices: Array<TerraBaseStorageService>;

    @Input()
    public set inputStorageServices( services: Array<TerraBaseStorageService> )
    {
        this._storageServices = services;
    }

    public get inputStorageServices(): Array<TerraBaseStorageService>
    {
        if ( this._storageServices && this._storageServices.length > 0 )
        {
            return this._storageServices;
        }

        return [this._frontendStorageService]
    }

    constructor(
        public splitConfig: FileBrowserSplitConfig,
        private _frontendStorageService: TerraFrontendStorageService )
    {
    }

    public ngOnInit():void
    {
        this.splitConfig.init( this.inputStorageServices );
    }

    public selectUrl( publicUrl: string )
    {
        this.onSelectedUrlChange.emit( publicUrl );
    }
}
