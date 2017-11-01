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

    constructor(
        public splitConfig: FileBrowserSplitConfig,
        private _frontendStorageService: TerraFrontendStorageService )
    {
    }

    public ngOnInit():void
    {
        this.splitConfig.init( this.inputStorageService );
    }

    public selectUrl( publicUrl: string )
    {
        this.onSelectedUrlChange.emit( publicUrl );
    }
}
