import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TerraStorageObjectList } from '../model/terra-storage-object-list';
import { TerraSimpleTableHeaderCellInterface } from '../../table/simple/cell/terra-simple-table-header-cell.interface';
import { TerraSimpleTableRowInterface } from '../../table/simple/row/terra-simple-table-row.interface';
import { TerraStorageObject } from '../model/terra-storage-object';
import * as moment from 'moment';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';
import { PathHelper } from '../helper/path.helper';
import { TerraFileBrowserComponent } from '../terra-file-browser.component';
import { FileType } from '../helper/fileType.helper';
import { TerraSimpleTableComponent } from '../../table/simple/terra-simple-table.component';
import { TerraFileBrowserService } from '../terra-file-browser.service';
import { TerraUploadItem } from '../model/terra-upload-item';
import { ClipboardHelper } from '../helper/clipboard.helper';
import { TerraSimpleTableCellInterface } from '../../table/simple/cell/terra-simple-table-cell.interface';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-file-list',
    template: require('./file-list.component.html'),
    styles:   [require('./file-list.component.scss')]
})
export class TerraFileListComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
    private _translationPrefix:string = 'terraFileBrowser';

    @Input()
    public inputStorageServices:Array<TerraBaseStorageService> = null;

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
            if(!isNullOrUndefined(this._storageSubscription))
            {
                this._storageSubscription.unsubscribe();
            }

            this._storageList = null;
            this._currentStorageRoot = null;
            this._activeStorageService = service;
            if(this._imagePreviewObject)
            {
                this._imagePreviewObject = null;
                this._parentFileBrowser.splitConfig.hideImagePreview();
            }
            this.renderFileList();
            this._storageSubscription = this.activeStorageService.getStorageList().subscribe((storageList) =>
            {
                this._storageList = storageList;
                this.renderFileList();
            });
        }

    }

    @ViewChild('fileDropzone', {read: ElementRef})
    private _fileDropzoneElement:ElementRef;

    @ViewChild(TerraSimpleTableComponent)
    private _fileTableComponent:TerraSimpleTableComponent<TerraStorageObject>;

    private _isDragActive:boolean = false;
    private _dragSubscription:Subscription;

    private _storageSubscription:Subscription;

    private _storageList:TerraStorageObjectList;

    private _currentStorageRoot:TerraStorageObject;

    private _imagePreviewTimeout:number;

    private _imagePreviewObject:TerraStorageObject;

    private _uploadStatus:{ [key:string]:boolean } = {};

    public get currentStorageRoot():TerraStorageObject
    {
        if(!isNullOrUndefined(this._currentStorageRoot))
        {
            return this._currentStorageRoot;
        }

        if(!isNullOrUndefined(this._storageList))
        {
            return this._storageList.root;
        }

        return null;
    }

    public set currentStorageRoot(storageObject:TerraStorageObject)
    {
        if((isNullOrUndefined(storageObject) || storageObject.isDirectory) && this._currentStorageRoot !== storageObject)
        {
            if(this._imagePreviewObject && storageObject !== this._imagePreviewObject)
            {
                this._imagePreviewObject = null;
                this._parentFileBrowser.splitConfig.hideImagePreview();
            }

            this._currentStorageRoot = storageObject;
            this.renderFileList();
        }
    }

    public get parentStorageObjects():Array<TerraStorageObject>
    {
        let current:TerraStorageObject = this.currentStorageRoot;
        let parents:Array<TerraStorageObject> = [];

        if(!isNullOrUndefined(this._imagePreviewObject))
        {
            parents.push(this._imagePreviewObject)
        }

        while(!isNullOrUndefined(current))
        {
            parents.push(current);
            current = current.parent;
        }

        return parents.reverse();
    }

    private _showNewDirectoryPrompt:boolean = false;

    private _newDirectoryName:string = '';

    public get newDirectoryName():string
    {
        return this._newDirectoryName;
    }

    public set newDirectoryName(name:string)
    {
        this._newDirectoryName = this.activeStorageService.prepareKey(name, true, true);
    }

    private _objectsToDelete:Array<TerraStorageObject> = [];

    private get _deleteCount():number
    {
        if(isNullOrUndefined(this._objectsToDelete))
        {
            return 0;
        }

        return this._objectsToDelete
                   .map((object:TerraStorageObject) =>
                   {
                       return object.fileCount;
                   })
                   .reduce((sum:number, current:number) =>
                   {
                       return sum + current;
                   }, 0);
    }

    private _selectedStorageObjects:Array<TerraStorageObject> = [];

    private _fileTableHeaderList:Array<TerraSimpleTableHeaderCellInterface> = [];

    private _fileTableRowList:Array<TerraSimpleTableRowInterface<TerraStorageObject>> = [];

    constructor(private _changeDetector:ChangeDetectorRef,
                private _fileBrowserService:TerraFileBrowserService,
                private _translationService:TranslationService,
                @Inject(forwardRef(() => TerraFileBrowserComponent)) private _parentFileBrowser:TerraFileBrowserComponent)
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

        this._dragSubscription = this._fileBrowserService.isDragActive.subscribe((isDragActive:boolean) =>
        {
            this._isDragActive = isDragActive;
            this._changeDetector.detectChanges();
        });

        this._parentFileBrowser.onSelectedUrlChange.subscribe((selectedUrl:string) =>
        {
            if(selectedUrl && this._storageList)
            {
                let object:TerraStorageObject = this._storageList.flatList.find(object => object.publicUrl === selectedUrl);

                if(!isNullOrUndefined(object))
                {
                    this.currentStorageRoot = object.parent;
                    if(FileType.isWebImage(object.key))
                    {
                        this._imagePreviewObject = object;
                        this._parentFileBrowser.splitConfig.showImagePreview(object, this.activeStorageService);
                    }
                    let row:TerraSimpleTableRowInterface<TerraStorageObject> = this._fileTableRowList.find(r => r.value === object);
                    this._fileTableComponent.inputHighlightedRow = row;
                }
            }
        });
    }

    public ngAfterViewInit():void
    {
        this._fileBrowserService.addDropzone(this._fileDropzoneElement.nativeElement);
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputStorageServices') && changes['inputStorageServices'].previousValue === null)
        {
            this.activeStorageService = this.inputStorageServices[0];
        }
    }

    public ngOnDestroy():void
    {
        if(!isNullOrUndefined(this._storageSubscription))
        {
            this._storageSubscription.unsubscribe();
        }

        if(!isNullOrUndefined(this._dragSubscription))
        {
            this._dragSubscription.unsubscribe();
        }

        this._fileBrowserService.removeDropzone(this._fileDropzoneElement.nativeElement);

    }

    private createDirectory():void
    {
        let path:string = PathHelper.join(
            this.currentStorageRoot ? this.currentStorageRoot.key : '/',
            this.newDirectoryName
        );
        this._showNewDirectoryPrompt = false;
        this._newDirectoryName = null;
        this.activeStorageService.createDirectory(path);
    }

    private deleteObjects():void
    {
        let keyList = [];
        let extractKeys = (objects:Array<TerraStorageObject>) =>
        {
            objects.forEach((object:TerraStorageObject) =>
            {
                keyList.push(object.key);
                if(object.isDirectory)
                {
                    extractKeys(object.children);
                }
            });
        };
        extractKeys(this._objectsToDelete);
        this.activeStorageService.deleteFiles(keyList);
        this._objectsToDelete = [];
        if(!isNullOrUndefined(this._imagePreviewObject) && keyList.indexOf(this._imagePreviewObject.key))
        {
            this._imagePreviewObject = null;
            this._parentFileBrowser.splitConfig.hideImagePreview();
        }
    }

    private renderFileList():void
    {
        if(!isNullOrUndefined(this.activeStorageService))
        {
            if(this.activeStorageService.isPublic)
            {
                this._fileTableHeaderList = [
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.fileName'),
                        width:   '30%'
                    },
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.fileURL'),
                        width:   '50%'
                    },
                    {
                        caption: '',
                        width:   '1'
                    },
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.fileSize'),
                        width:   '7.5%'
                    },
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.lastChange'),
                        width:   '12.5%'
                    },
                    {
                        caption: '',
                        width:   '1'
                    }
                ];
            }
            else
            {
                this._fileTableHeaderList = [
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.fileName'),
                        width:   '80%'
                    },
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.fileSize'),
                        width:   '7.5%'
                    },
                    {
                        caption: this._translationService.translate(this._translationPrefix + '.lastChange'),
                        width:   '12.5%'
                    },
                    {
                        caption: '',
                        width:   '1'
                    }
                ];
            }
        }


        if(!isNullOrUndefined(this.currentStorageRoot))
        {
            this._fileTableRowList = this.currentStorageRoot.children.filter((storageObject:TerraStorageObject) =>
                {
                    return storageObject.isFile || this._parentFileBrowser.inputAllowFolders;
                }
            ).sort((objectA:TerraStorageObject, objectB:TerraStorageObject) =>
                {
                    return objectA.name.localeCompare(objectB.name);
                }
            ).map((storageObject:TerraStorageObject) =>
            {
                let deleteButton:TerraButtonInterface = {
                    icon:             'icon-delete',
                    clickFunction:    (event:Event) =>
                                      {
                                          this._objectsToDelete = [storageObject];
                                          event.stopPropagation();
                                      },
                    isSecondary:      true,
                    tooltipText:      this._translationService.translate(this._translationPrefix + '.deleteFile'),
                    tooltipPlacement: 'left'
                };

                let clipboardButton:TerraButtonInterface = {
                    icon:             'icon-copy_clipboard',
                    clickFunction:    (event:Event) =>
                                      {
                                          ClipboardHelper.copyText(storageObject.publicUrl);
                                          event.stopPropagation();
                                      },
                    tooltipText:      this._translationService.translate(this._translationPrefix + '.copyToClipboard'),
                    tooltipPlacement: 'left'
                };

                let cellList:Array<TerraSimpleTableCellInterface> = [];
                cellList.push(
                    {
                        caption: storageObject.name,
                        icon:    this._uploadStatus[storageObject.key] ? 'icon-loading' : storageObject.icon
                    }
                );

                if(this.activeStorageService.isPublic)
                {
                    cellList.push(
                        {
                            caption: storageObject.isFile ? storageObject.publicUrl : ''
                        },
                        {
                            buttonList: storageObject.isFile ? [clipboardButton] : []
                        }
                    );
                }
                cellList.push(
                    {
                        caption: storageObject.isFile ? storageObject.sizeString : ''
                    },
                    {
                        caption: storageObject.isFile ? moment(storageObject.lastModified).format('YYYY-MM-DD HH:mm') : ''
                    },
                    {
                        buttonList: [deleteButton]
                    }
                );

                return {
                    cellList: cellList,
                    value:    storageObject,
                    disabled: !this.isAllowed(storageObject.key)
                };
            });
        }
        else
        {
            this._fileTableRowList = [];
        }
        this._selectedStorageObjects = [];
        this._parentFileBrowser.outputSelectedChange.emit(null);
        this._changeDetector.detectChanges();
    }

    private isAllowed(filename:string):boolean
    {
        if(isNullOrUndefined(filename))
        {
            return false;
        }

        return this._parentFileBrowser.inputAllowedExtensions.length <= 0
               || this._parentFileBrowser.inputAllowedExtensions.indexOf(PathHelper.extName(filename)) >= 0
               || PathHelper.isDirectory(filename)
    }

    private onActiveRowChange(row:TerraSimpleTableRowInterface<TerraStorageObject>):void
    {
        if(isNullOrUndefined(this._imagePreviewTimeout))
        {
            clearTimeout(this._imagePreviewTimeout);
        }
        let debounceFn = () =>
        {
            let storageObject:TerraStorageObject = row.value;

            if(!isNullOrUndefined(storageObject) && FileType.isWebImage(storageObject.key))
            {
                this._imagePreviewObject = storageObject;
                this._parentFileBrowser.splitConfig.showImagePreview(storageObject, this.activeStorageService);
            }
            else
            {
                this._imagePreviewObject = null;
                this._parentFileBrowser.splitConfig.hideImagePreview();
            }

            this._parentFileBrowser.outputSelectedChange.emit(storageObject);
        };
        this._imagePreviewTimeout = setTimeout(debounceFn.bind(this), 500);
    }

    public onSelectionChange(rows:Array<TerraSimpleTableRowInterface<TerraStorageObject>>):void
    {
        this._selectedStorageObjects = rows.map((row:TerraSimpleTableRowInterface<TerraStorageObject>) =>
        {
            return row.value;
        });
    }

    public onFileSelect(event:Event):void
    {
        if(!isNullOrUndefined(event.srcElement))
        {
            this.activeStorageService
                .uploadFiles(
                    (<any>event.srcElement).files || [],
                    this.currentStorageRoot ? this.currentStorageRoot.key : '/'
                );

            // unset value of file input to allow selecting same file again
            (<HTMLInputElement>event.target).value = '';
        }
    }

    public onFileDrop(event:DragEvent):void
    {
        if(!isNullOrUndefined(event.dataTransfer.files))
        {
            this.activeStorageService.uploadFiles(
                event.dataTransfer.files,
                this.currentStorageRoot ? this.currentStorageRoot.key : '/'
            );
        }
    }

    private uploadFiles(fileList:FileList | File[]):void
    {
        let uploadPrefix:string = this.currentStorageRoot ? this.currentStorageRoot.key : '/';
        this.activeStorageService
            .uploadFiles(
                (<any>event.srcElement).files || [],
                uploadPrefix
            )
            .forEach((uploadItem:TerraUploadItem) =>
            {
                this._uploadStatus[uploadPrefix + uploadItem.filename] = true;
                uploadItem.onSuccess(() =>
                {
                    this._uploadStatus[uploadPrefix + uploadItem.filename] = false;
                    this.renderFileList();
                });
            });
    }

}