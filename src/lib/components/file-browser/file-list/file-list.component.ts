/* tslint:disable:max-file-line-count */
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraFileBrowserComponent } from '../terra-file-browser.component';
import { TerraFileBrowserService } from '../terra-file-browser.service';
import {
    DefaultLocale,
    Language,
    LocaleService,
    TranslationService
} from 'angular-l10n';
import { TerraUploadProgress } from '../model/terra-upload-progress';
import {
    isNullOrUndefined,
    isNumber
} from 'util';
import { TerraBasePrivateStorageService } from '../terra-base-private-storage.interface';
import { TerraStorageObjectList } from '../model/terra-storage-object-list';
import { PathHelper } from '../../../helpers/path.helper';
import { TerraSimpleTableComponent } from '../../tables/simple/terra-simple-table.component';
import { TerraStorageObject } from '../model/terra-storage-object';
import { FileTypeHelper } from '../../../helpers/fileType.helper';
import { TerraSimpleTableRowInterface } from '../../tables/simple/row/terra-simple-table-row.interface';
import { ClipboardHelper } from '../../../helpers/clipboard.helper';
import { TerraSimpleTableCellInterface } from '../../tables/simple/cell/terra-simple-table-cell.interface';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';
import { TerraSimpleTableHeaderCellInterface } from '../../tables/simple/cell/terra-simple-table-header-cell.interface';
import { AlertService } from '../../alert/alert.service';

const MAX_UPLOAD_COUNT:number = 10;

@Component({
    selector:  'terra-file-list',
    template:  require('./file-list.component.html'),
    styles:    [require('./file-list.component.scss')],
    providers: [TerraFileBrowserService]
})
export class TerraFileListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
    // @TODO rename to storageService:TerraBaseStorageService
    @Input()
    public inputStorageServices:Array<TerraBaseStorageService> = null;

    @Output()
    public showImagePreview:EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    public hideImagePreview:EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public selectNode:EventEmitter<TerraStorageObject> = new EventEmitter<TerraStorageObject>();

    public imagePreviewObject:TerraStorageObject;

    @Language()
    protected lang:string;

    protected translationPrefix:string = 'terraFileBrowser';

    protected isDragActive:boolean = false;
    protected progress:TerraUploadProgress = null;

    protected storageList:TerraStorageObjectList;

    protected showNewDirectoryPrompt:boolean = false;

    protected objectsToDelete:Array<TerraStorageObject> = [];

    protected selectedStorageObjects:Array<TerraStorageObject> = [];

    protected fileTableHeaderList:Array<TerraSimpleTableHeaderCellInterface> = [];

    protected fileTableRowList:Array<TerraSimpleTableRowInterface<TerraStorageObject>> = [];

    private _activeStorageService:TerraBaseStorageService;

    public get activeStorageService():TerraBaseStorageService
    {
        if(!isNullOrUndefined(this._activeStorageService))
        {
            return this._activeStorageService;
        }

        if(!isNullOrUndefined(this.inputStorageServices))
        {
            return this.inputStorageServices[0];
        }

        return null;
    }

    public set activeStorageService(service:TerraBaseStorageService)
    {
        if(service !== this._activeStorageService)
        {
            if(!isNullOrUndefined(this.storageSubscription))
            {
                this.storageSubscription.unsubscribe();
                this.storageSubscription = null;
            }
            if(!isNullOrUndefined(this.progressSubscription))
            {
                this.progressSubscription.unsubscribe();
                this.progressSubscription = null;
            }

            this.storageList = null;
            this._currentStorageRoot = null;
            this._activeStorageService = service;
            if(this.imagePreviewObject)
            {
                this.imagePreviewObject = null;
                this.showImagePreview.emit(this.activeStorageService.isImagePreviewEnabled);
            }
            this.renderFileList();
            this.storageSubscription = this.activeStorageService.getStorageList().subscribe((storageList:TerraStorageObjectList):void =>
            {
                this.storageList = storageList;
                this.renderFileList();
            });
            this.progressSubscription = this.activeStorageService.queue.status.subscribe((progress:TerraUploadProgress) =>
            {
                this.progress = progress;

                if(!isNullOrUndefined(this.progress))
                {
                    if(isNumber(this.progress.sizeUploaded))
                    {
                        this.progress.sizeUploaded = PathHelper.sizeString(this.progress.sizeUploaded);
                    }
                    if(isNumber(this.progress.sizeTotal))
                    {
                        this.progress.sizeTotal = PathHelper.sizeString(this.progress.sizeTotal);
                    }

                    if(progress.filesTotal === progress.filesUploaded)
                    {
                        this.selectNode.emit(this.currentStorageRoot);
                    }
                }
                this.changeDetector.detectChanges();
            });
        }

    }

    @ViewChild('fileDropzone', {read: ElementRef})
    private fileDropzoneElement:ElementRef;

    @ViewChild(TerraSimpleTableComponent)
    private fileTableComponent:TerraSimpleTableComponent<TerraStorageObject>;

    private dragSubscription:Subscription;

    private storageSubscription:Subscription;

    private progressSubscription:Subscription;

    private _currentStorageRoot:TerraStorageObject;

    private imagePreviewTimeout:any;

    public get currentStorageRoot():TerraStorageObject
    {
        if(!isNullOrUndefined(this._currentStorageRoot))
        {
            return this._currentStorageRoot;
        }

        if(!isNullOrUndefined(this.storageList))
        {
            return this.storageList.root;
        }

        return null;
    }

    public set currentStorageRoot(storageObject:TerraStorageObject)
    {
        if((isNullOrUndefined(storageObject) || storageObject.isDirectory) && this._currentStorageRoot !== storageObject)
        {
            if(this.imagePreviewObject && storageObject !== this.imagePreviewObject)
            {
                this.imagePreviewObject = null;
                this.hideImagePreview.emit();
            }

            this._currentStorageRoot = storageObject;
            this.renderFileList();
        }
    }

    public get parentStorageObjects():Array<TerraStorageObject>
    {
        let current:TerraStorageObject = this.currentStorageRoot;
        let parents:Array<TerraStorageObject> = [];

        if(!isNullOrUndefined(this.imagePreviewObject))
        {
            parents.push(this.imagePreviewObject);
        }

        while(!isNullOrUndefined(current))
        {
            parents.push(current);
            current = current.parent;
        }

        return parents.reverse();
    }

    private _newDirectoryName:string = '';

    public get newDirectoryName():string
    {
        return this._newDirectoryName;
    }

    public set newDirectoryName(name:string)
    {
        this._newDirectoryName = this.activeStorageService.prepareKey(name, true, true);
    }

    protected get _deleteCount():number
    {
        if(isNullOrUndefined(this.objectsToDelete))
        {
            return 0;
        }

        return this.objectsToDelete
                   .map((object:TerraStorageObject) =>
                   {
                       return object.fileCount;
                   })
                   .reduce((sum:number, current:number) =>
                   {
                       return sum + current;
                   }, 0);
    }

    @DefaultLocale()
    private defaultLocale:string;

    constructor(private changeDetector:ChangeDetectorRef,
                private fileBrowserService:TerraFileBrowserService,
                private translationService:TranslationService,
                private localeService:LocaleService,
                private alertService:AlertService,
                @Inject(forwardRef(() => TerraFileBrowserComponent)) protected parentFileBrowser:TerraFileBrowserComponent)
    {
    }

    public ngOnInit():void
    {
        if(!isNullOrUndefined(this.inputStorageServices) && this.inputStorageServices.length > 0)
        {
            this.activeStorageService = this.inputStorageServices[0];
        }
        else
        {
            console.error('At least one instance of TerraBaseStorageService is required');
        }

        this.dragSubscription = this.fileBrowserService.isDragActive.subscribe((isDragActive:boolean) =>
        {
            this.isDragActive = isDragActive;
            this.changeDetector.detectChanges();
        });

        this.parentFileBrowser.onSelectedUrlChange.subscribe((selectedUrl:string) =>
        {
            if(selectedUrl && this.storageList)
            {
                let object:TerraStorageObject = this.storageList.flatList.find(
                    (storage:TerraStorageObject):boolean => storage.publicUrl === selectedUrl);

                if(!isNullOrUndefined(object))
                {
                    this.currentStorageRoot = object.parent;
                    if(FileTypeHelper.isWebImage(object.key))
                    {
                        this.imagePreviewObject = object;
                        this.showImagePreview.emit(this.activeStorageService.isImagePreviewEnabled);
                    }
                    this.fileTableComponent.inputHighlightedRow = this.fileTableRowList.find(
                        (r:TerraSimpleTableRowInterface<TerraStorageObject>):boolean => r.value === object);
                }
            }
        });
    }

    public ngAfterViewInit():void
    {
        this.fileBrowserService.addDropzone(this.fileDropzoneElement.nativeElement);
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputStorageServices'))
        {
            this.activeStorageService = this.inputStorageServices[0];
        }
    }

    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this.storageSubscription))
        {
            this.storageSubscription.unsubscribe();
        }

        if(!isNullOrUndefined(this.dragSubscription))
        {
            this.dragSubscription.unsubscribe();
        }

        this.fileBrowserService.removeDropzone(this.fileDropzoneElement.nativeElement);

    }

    public onSelectionChange(rows:Array<TerraSimpleTableRowInterface<TerraStorageObject>>):void
    {
        this.selectedStorageObjects = rows.map((row:TerraSimpleTableRowInterface<TerraStorageObject>) =>
        {
            return row.value;
        });
    }

    public onFileSelect(event:Event):void
    {
        let target:any = event.target || event.srcElement;

        if(!isNullOrUndefined(target) && !isNullOrUndefined(target.files))
        {
            this.uploadFiles(target.files);

            // unset value of file input to allow selecting same file again
            (<HTMLInputElement> event.target).value = '';
        }
    }

    public onFileDrop(event:DragEvent):void
    {
        if(!isNullOrUndefined(event.dataTransfer.files))
        {
            this.uploadFiles(event.dataTransfer.files);
        }
    }

    protected createDirectory():void
    {
        let path:string = PathHelper.join(
            this.currentStorageRoot ? this.currentStorageRoot.key : '/',
            this.newDirectoryName
        );
        this.showNewDirectoryPrompt = false;
        this._newDirectoryName = null;
        this.activeStorageService.createDirectory(path).subscribe((response:any) =>
        {
            this.selectNode.emit(this.currentStorageRoot);
        });
    }

    protected deleteObjects():void
    {
        let keyList:Array<string> = [];
        let extractKeys:Function = (objects:Array<TerraStorageObject>):void =>
        {
            objects.forEach((object:TerraStorageObject) =>
            {
                keyList.push(object.key);
            });
        };
        extractKeys(this.objectsToDelete);
        this.activeStorageService.deleteFiles(keyList).subscribe(() =>
        {
            this.objectsToDelete = [];

            if(!isNullOrUndefined(this.imagePreviewObject) && keyList.indexOf(this.imagePreviewObject.key) >= 0)
            {
                this.imagePreviewObject = null;
                this.hideImagePreview.emit();
            }
            this.selectNode.emit(this.currentStorageRoot);
        });
    }

    protected onRowClick(row:TerraSimpleTableRowInterface<TerraStorageObject>):void
    {
        let storageObject:TerraStorageObject = row.value;
        if(storageObject.isDirectory)
        {
            this.currentStorageRoot = storageObject;
            this.selectNode.emit(storageObject);
        }
    }

    protected onActiveRowChange(row:TerraSimpleTableRowInterface<TerraStorageObject>):void
    {
        let storageObject:TerraStorageObject = row.value;
        this.showOrHideImagePreview(storageObject);
        if(isNullOrUndefined(this.imagePreviewTimeout))
        {
            clearTimeout(this.imagePreviewTimeout);
        }
        let debounceFn:Function = ():void =>
        {

            if(!isNullOrUndefined(storageObject) && FileTypeHelper.isWebImage(storageObject.key))
            {
                this.imagePreviewObject = storageObject;
            }
            else
            {
                this.imagePreviewObject = null;
            }

            this.parentFileBrowser.outputSelectedChange.emit(storageObject);
        };
        this.imagePreviewTimeout = setTimeout(debounceFn.bind(this), 500);
    }

    private renderFileList():void
    {
        if(!isNullOrUndefined(this.activeStorageService))
        {
            this.createHeaderListDependingOnAccessLevel();
        }

        if(!isNullOrUndefined(this.currentStorageRoot))
        {
            this.fillTableRowList();
        }
        else
        {
            this.fileTableRowList = [];
        }

        this.selectedStorageObjects = [];
        this.parentFileBrowser.outputSelectedChange.emit(null);
        this.changeDetector.detectChanges();
    }

    private fillTableRowList():void
    {
        this.fileTableRowList = this.currentStorageRoot.children.filter((storageObject:TerraStorageObject) =>
            {
                return storageObject.isFile || this.parentFileBrowser.inputAllowFolders;
            }
        ).sort((objectA:TerraStorageObject, objectB:TerraStorageObject) =>
            {
                return objectA.name.localeCompare(objectB.name);
            }
        ).filter((storageObject:TerraStorageObject) => this.isAllowed(storageObject.key))
                                    .map((storageObject:TerraStorageObject) =>
                                    {
                                        return this.createTableRow(storageObject);
                                    });
    }

    private createTableRow(storageObject:TerraStorageObject):TerraSimpleTableRowInterface<TerraStorageObject>
    {
        let cellList:Array<TerraSimpleTableCellInterface> = [];

        cellList.push(
            {
                caption: storageObject.name,
                icon:    storageObject.icon
            }
        );

        if(!(this.activeStorageService instanceof TerraBasePrivateStorageService))
        {
            cellList.push({
                caption: storageObject.isFile ? storageObject.publicUrl : ''
            });

            this.addClipboardButton(storageObject, cellList);
        }

        cellList.push(
            {
                caption: storageObject.isFile ? storageObject.sizeString : ''
            },
            {
                caption: storageObject.isFile ? this.localeService.formatDate(storageObject.lastModified, 'medium', this.defaultLocale) : ''
            }
        );

        if(this.activeStorageService instanceof TerraBasePrivateStorageService && storageObject.isFile)
        {
            this.addDownloadButton(storageObject, cellList);
        }

        this.addDeleteButton(storageObject, cellList);

        return {
            cellList: cellList,
            value:    storageObject,
            disabled: !this.isAllowed(storageObject.key)
        };
    }

    private addClipboardButton(storageObject:TerraStorageObject, cellList:Array<TerraSimpleTableCellInterface>):void
    {
        let clipboardButton:TerraButtonInterface = {
            icon:             'icon-copy_clipboard',
            clickFunction:    (event:Event):void =>
                              {
                                  ClipboardHelper.copyText(storageObject.publicUrl);
                                  event.stopPropagation();
                              },
            tooltipText:      this.translationService.translate(this.translationPrefix + '.copyToClipboard'),
            tooltipPlacement: 'left'
        };

        cellList.push(
            {
                buttonList: storageObject.isFile ? [clipboardButton] : []
            }
        );
    }

    private addDownloadButton(storageObject:TerraStorageObject, cellList:Array<TerraSimpleTableCellInterface>):void
    {
        cellList.push({
            buttonList: [{
                icon:             'icon-download',
                clickFunction:    (event:Event):void =>
                                  {
                                      (<TerraBasePrivateStorageService> this.activeStorageService).downloadFile(storageObject.key);
                                      event.stopPropagation();
                                  },
                tooltipText:      this.translationService.translate(this.translationPrefix + '.downloadFile'),
                tooltipPlacement: 'left'
            }]
        });
    }

    private addDeleteButton(storageObject:TerraStorageObject, cellList:Array<TerraSimpleTableCellInterface>):void
    {
        cellList.push({
            buttonList: [{
                icon:             'icon-delete',
                clickFunction:    (event:Event):void =>
                                  {
                                      this.objectsToDelete = [storageObject];
                                      event.stopPropagation();
                                  },
                tooltipText:      storageObject.isFile ?
                                      this.translationService.translate(this.translationPrefix + '.deleteFile') :
                                      this.translationService.translate(this.translationPrefix + '.deleteFolder'),
                tooltipPlacement: 'left'
            }]
        });
    }

    private createHeaderListDependingOnAccessLevel():void
    {
        if(this.activeStorageService instanceof TerraBasePrivateStorageService)
        {
            this.createPrivateHeaderList();
        }
        else
        {
            this.createPublicHeaderList();
        }
    }

    private createPublicHeaderList():void
    {
        this.fileTableHeaderList = [
            {
                caption: this.translationService.translate(this.translationPrefix + '.fileName'),
                width:   '30%'
            },
            {
                caption: this.translationService.translate(this.translationPrefix + '.fileURL'),
                width:   '40%'
            },
            {
                caption: '',
                width:   '5%'
            },
            {
                caption: this.translationService.translate(this.translationPrefix + '.fileSize'),
                width:   '7.5%'
            },
            {
                caption: this.translationService.translate(this.translationPrefix + '.lastChange'),
                width:   '12.5%'
            },
            {
                caption: '',
                width:   '5%'
            }
        ];
    }

    private createPrivateHeaderList():void
    {
        this.fileTableHeaderList = [
            {
                caption: this.translationService.translate(this.translationPrefix + '.fileName'),
                width:   '70%'
            },
            {
                caption: this.translationService.translate(this.translationPrefix + '.fileSize'),
                width:   '7.5%'
            },
            {
                caption: this.translationService.translate(this.translationPrefix + '.lastChange'),
                width:   '12.5%'
            },
            {
                caption: '',
                width:   '5%'
            },
            {
                caption: '',
                width:   '5%'
            }
        ];
    }

    private isAllowed(filename:string):boolean
    {
        if(isNullOrUndefined(filename))
        {
            return false;
        }

        return this.parentFileBrowser.inputAllowedExtensions.length <= 0
               || this.parentFileBrowser.inputAllowedExtensions.indexOf(PathHelper.extName(filename).toUpperCase()) >= 0
               || PathHelper.isDirectory(filename);
    }

    private showOrHideImagePreview(storageObject:TerraStorageObject):void
    {
        if(!isNullOrUndefined(storageObject) && FileTypeHelper.isWebImage(storageObject.key))
        {
            this.showImagePreview.emit(this.activeStorageService.isImagePreviewEnabled);
        }
        else
        {
            this.hideImagePreview.emit();
        }
    }

    private uploadFiles(fileList:FileList | Array<File>):void
    {
        const queueLength:number = !this.progress ? 0 : (this.progress.filesTotal - this.progress.filesUploaded);
        if(fileList.length + queueLength > MAX_UPLOAD_COUNT)
        {
            this.alertService.error(
                this.translationService.translate('terraFileBrowser.error.tooManyFiles', {max: MAX_UPLOAD_COUNT})
            );
            return;
        }

        let uploadPrefix:string = this.currentStorageRoot ? this.currentStorageRoot.key : '/';
        this.activeStorageService
            .uploadFiles(
                fileList,
                uploadPrefix
            );
    }
}
