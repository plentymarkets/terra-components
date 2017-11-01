import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
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

@Component({
               selector: 'terra-file-list',
               template: require('./file-list.component.html'),
               styles:   [require('./file-list.component.scss')]
           })
export class TerraFileListComponent implements OnInit, AfterViewInit, OnDestroy
{
    private _translationPrefix:string = 'terraFileBrowser';

    @Input()
    public inputStorageService:TerraBaseStorageService;

    @ViewChild('fileDropzone', {read: ElementRef})
    private _fileDropzoneElement:ElementRef;

    @ViewChild(TerraSimpleTableComponent)
    private _fileTableComponent: TerraSimpleTableComponent<TerraStorageObject>;

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
        if(this._currentStorageRoot)
        {
            return this._currentStorageRoot;
        }

        if(this._storageList)
        {
            return this._storageList.root;
        }

        return null;
    }

    public set currentStorageRoot(storageObject:TerraStorageObject)
    {
        if ( this._imagePreviewObject && storageObject !== this._imagePreviewObject )
        {
            this._imagePreviewObject = null;
            this._parentFileBrowser.splitConfig.hideImagePreview();
        }

        if((!storageObject || storageObject.isDirectory) && this._currentStorageRoot !== storageObject)
        {
            this._currentStorageRoot = storageObject;
            this.renderFileList();
        }
    }

    public get parentStorageObjects():Array<TerraStorageObject>
    {
        let current:TerraStorageObject = this.currentStorageRoot;
        let parents:Array<TerraStorageObject> = [];

        if ( this._imagePreviewObject )
        {
            parents.push( this._imagePreviewObject )
        }

        while(current)
        {
            parents.push(current);
            current = current.parent;
        }

        return parents.reverse();
    }

    private _showNewDirectoryPrompt:boolean = false;

    private _newDirectoryName:string = "";

    public get newDirectoryName():string
    {
        return this._newDirectoryName;
    }

    public set newDirectoryName(name:string)
    {
        this._newDirectoryName = this.inputStorageService.prepareKey(name, true, true);
    }

    private _objectsToDelete:Array<TerraStorageObject> = [];

    private get _deleteCount():number
    {
        if ( !this._objectsToDelete )
        {
            return 0;
        }

        return this._objectsToDelete
                   .map( (object: TerraStorageObject) => {
                       return object.fileCount;
                   })
                   .reduce( (sum: number, current: number) => {
                       return sum + current;
                   }, 0);
    }

    private _selectedStorageObjects:Array<TerraStorageObject> = [];

    private _fileTableHeaderList:Array<TerraSimpleTableHeaderCellInterface> = [];

    private _fileTableRowList:Array<TerraSimpleTableRowInterface<TerraStorageObject>> = [];

    constructor(private _changeDetector:ChangeDetectorRef,
                private _fileBrowserService:TerraFileBrowserService,
                @Inject(forwardRef(() => TerraFileBrowserComponent)) private _parentFileBrowser:TerraFileBrowserComponent)
    {
    }

    public ngOnInit():void
    {
        if ( this.inputStorageService.isPublic )
        {
            this._fileTableHeaderList = [
                { caption: 'Dateiname', width: '30%' },
                { caption: 'Datei-URL', width: '50%' },
                { caption: '', width: '1' },
                { caption: 'Dateigröße', width: '7.5%' },
                { caption: 'Letzte Änderung', width: '12.5%' },
                { caption: '', width: '1' }
            ];
        }
        else
        {
            this._fileTableHeaderList = [
                { caption: 'Dateiname', width: '80%' },
                { caption: 'Dateigröße', width: '7.5%' },
                { caption: 'Letzte Änderung', width: '12.5%' },
                { caption: '', width: '1' }
            ];
        }

        this._storageSubscription = this.inputStorageService
                                        .getStorageList()
                                        .subscribe((storageList) => {
                                            this._storageList = storageList;
                                            this.renderFileList();
                                        });

        this._dragSubscription = this._fileBrowserService.isDragActive.subscribe((isDragActive:boolean) => {
            this._isDragActive = isDragActive;
            this._changeDetector.detectChanges();
        });

        this._parentFileBrowser.onSelectedUrlChange.subscribe( (selectedUrl: string) => {
            if ( selectedUrl && this._storageList )
            {
                let object: TerraStorageObject = this._storageList.flatList.find( object => object.publicUrl === selectedUrl );

                if ( object )
                {
                    this.currentStorageRoot = object.parent;
                    if( FileType.isWebImage(object.key) )
                    {
                        this._imagePreviewObject = object;
                        this._parentFileBrowser.splitConfig.showImagePreview(object);
                    }
                    let row: TerraSimpleTableRowInterface<TerraStorageObject> = this._fileTableRowList.find( r => r.value === object );
                    this._fileTableComponent.inputHighlightedRow = row;
                }
            }
        });
    }

    public ngAfterViewInit():void
    {
        this._fileBrowserService.addDropzone(this._fileDropzoneElement.nativeElement);
    }

    public ngOnDestroy():void
    {
        if(this._storageSubscription)
        {
            this._storageSubscription.unsubscribe();
        }

        if(this._dragSubscription)
        {
            this._dragSubscription.unsubscribe();
        }

        this._fileBrowserService.removeDropzone(this._fileDropzoneElement.nativeElement);

    }

    private createDirectory()
    {
        let path:string = PathHelper.join(
            this.currentStorageRoot ? this.currentStorageRoot.key : '/',
            this.newDirectoryName
        );
        this._showNewDirectoryPrompt = false;
        this._newDirectoryName = null;
        this.inputStorageService.createDirectory(path);
    }

    private deleteObjects()
    {
        let keyList = [];
        let extractKeys = (objects:Array<TerraStorageObject>) => {
            objects.forEach((object:TerraStorageObject) => {
                keyList.push(object.key);
                if(object.isDirectory)
                {
                    extractKeys(object.children);
                }
            });
        };
        extractKeys(this._objectsToDelete);
        this.inputStorageService.deleteFiles(keyList);
        this._objectsToDelete = [];
        if ( this._imagePreviewObject && keyList.indexOf( this._imagePreviewObject.key) )
        {
            this._imagePreviewObject = null;
            this._parentFileBrowser.splitConfig.hideImagePreview();
        }
    }

    private renderFileList():void
    {
        if(this.currentStorageRoot)
        {
            this._fileTableRowList = this.currentStorageRoot
                                         .children
                                         .filter( (storageObject: TerraStorageObject) => {
                                            return storageObject.isFile || this._parentFileBrowser.inputAllowFolders;
                                         })
                                         .sort((objectA:TerraStorageObject, objectB:TerraStorageObject) => {
                                             return objectA.name.localeCompare( objectB.name );
                                         })
                                         .map((storageObject:TerraStorageObject) => {
                                             let deleteButton:TerraButtonInterface = {
                                                 icon:             'icon-delete',
                                                 clickFunction:    (event:Event) => {
                                                     this._objectsToDelete = [storageObject];
                                                     event.stopPropagation();
                                                 },
                                                 isSecondary:      true,
                                                 tooltipText:      'Datei löschen',
                                                 tooltipPlacement: 'left'
                                             };

                                             let clipboardButton:TerraButtonInterface = {
                                                 icon: 'icon-copy_clipboard',
                                                 clickFunction: (event: Event) => {
                                                     ClipboardHelper.copyText(storageObject.publicUrl);
                                                     event.stopPropagation();
                                                 },
                                                 tooltipText: 'In Zwischenablage kopieren',
                                                 tooltipPlacement: 'left'
                                             };

                                             let cellList: Array<TerraSimpleTableCellInterface> = [];
                                             cellList.push(
                                                 { caption: storageObject.name, icon: this._uploadStatus[storageObject.key] ? 'icon-loading' : storageObject.icon}
                                             );

                                             if ( this.inputStorageService.isPublic )
                                             {
                                                 cellList.push(
                                                     { caption: storageObject.isFile? storageObject.publicUrl : ''},
                                                     { buttonList: storageObject.isFile ? [clipboardButton] : []}
                                                 );
                                             }
                                             cellList.push(
                                                 { caption: storageObject.isFile ? storageObject.sizeString : ''},
                                                 { caption: storageObject.isFile ? moment(storageObject.lastModified).format('YYYY-MM-DD HH:mm') : '' },
                                                 { buttonList: [deleteButton] }
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
        this._changeDetector.detectChanges();
    }

    private isAllowed(filename:string):boolean
    {
        if(!filename)
        {
            return false;
        }

        return this._parentFileBrowser.inputAllowedExtensions.length <= 0
               || this._parentFileBrowser.inputAllowedExtensions.indexOf(PathHelper.extName(filename)) >= 0
               || PathHelper.isDirectory(filename)
    }

    private onActiveRowChange(row:TerraSimpleTableRowInterface<TerraStorageObject>)
    {
        if(this._imagePreviewTimeout)
        {
            clearTimeout(this._imagePreviewTimeout);
        }
        let debounceFn = () => {
            let storageObject:TerraStorageObject = row.value;

            if(storageObject && FileType.isWebImage(storageObject.key))
            {
                this._imagePreviewObject = storageObject;
                this._parentFileBrowser.splitConfig.showImagePreview(storageObject);
            }
            else
            {
                this._imagePreviewObject = null;
                this._parentFileBrowser.splitConfig.hideImagePreview();
            }

            this._parentFileBrowser.outputSelectedChange.emit( storageObject );
        };
        this._imagePreviewTimeout = setTimeout(debounceFn.bind(this), 500);
    }

    public onSelectionChange(rows:Array<TerraSimpleTableRowInterface<TerraStorageObject>>)
    {
        this._selectedStorageObjects = rows.map((row:TerraSimpleTableRowInterface<TerraStorageObject>) => {
            return row.value;
        });
    }

    public onFileSelect(event:Event):void
    {
        if(event.srcElement)
        {
            this.inputStorageService
                .uploadFiles(
                    (<any>event.srcElement).files || [],
                    this.currentStorageRoot ? this.currentStorageRoot.key : '/'
                );

            // unset value of file input to allow selecting same file again
            (<HTMLInputElement>event.target).value = '';
        }
    }

    public onFileDrop(event:DragEvent)
    {
        if(event.dataTransfer.files)
        {
            this.inputStorageService.uploadFiles(
                event.dataTransfer.files,
                this.currentStorageRoot ? this.currentStorageRoot.key : '/'
            );
        }
    }

    private uploadFiles(fileList:FileList | File[])
    {
        let uploadPrefix:string = this.currentStorageRoot ? this.currentStorageRoot.key : '/';
        this.inputStorageService
            .uploadFiles(
                (<any>event.srcElement).files || [],
                uploadPrefix
            )
            .forEach((uploadItem:TerraUploadItem) => {
                this._uploadStatus[uploadPrefix + uploadItem.filename] = true;
                uploadItem.onSuccess(() => {
                    this._uploadStatus[uploadPrefix + uploadItem.filename] = false;
                    this.renderFileList();
                });
            });
    }


}