import {
    ChangeDetectorRef,
    Component,
    ElementRef, OnDestroy,
    OnInit,
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

@Component({
    selector: 'terra-file-browser',
    template: require('./terra-file-browser.component.html'),
    styles: [require('./terra-file-browser.component.scss')]
})
export class TerraFileBrowserComponent implements OnInit, OnDestroy
{
    @ViewChild('fileChooser', { read: ElementRef })
    public fileChooserElement: ElementRef;

    @ViewChild('fileDropzone', { read: ElementRef })
    public fileDropzoneElement: ElementRef;

    public storageList: TerraStorageObjectList;

    public uploadProgresses: {[key: string]: number} = {};

    public showNewDirectoryPrompt: boolean = false;
    public newDirectoryName: string;

    public deletableObjectKey: string = null;

    public isFileDragged: boolean = false;

    private _currentRoot: TerraStorageObject;

    public get currentRoot(): TerraStorageObject
    {
        if ( this._currentRoot )
        {
            return this._currentRoot;
        }

        if( this.storageList )
        {
            return this.storageList.root;
        }
        return null;
    }

    private _selectedStorageObjectName: string;
    public get selectedStorageObject(): TerraStorageObject
    {
        if ( !this.currentRoot || !this._selectedStorageObjectName )
        {
            return null;
        }
        return this.currentRoot.getChild( this._selectedStorageObjectName );
    }

    public set selectedStorageObject( object: TerraStorageObject )
    {
        if ( !object )
        {
            this._selectedStorageObjectName = null;
        }
        else
        {
            this._selectedStorageObjectName = object.name;
        }
    }

    public get parentObjects(): TerraStorageObject[]
    {
        let current: TerraStorageObject = this.currentRoot;
        let parents: TerraStorageObject[] = [];
        while( current )
        {
            parents.push( current );
            current = current.parent;
        }

        return parents.reverse();
    }

    private _globalListeners: {[event: string]: (...args: any[]) => void} = {};

    constructor(
        private frontendStorageService: TerraFrontendStorageService,
        private changeDetector: ChangeDetectorRef  )
    {
    }

    public ngOnInit(): void
    {
        let registerGlobalEvent = ( event: string, callback: ( event: Event ) => void ) => {
            this._globalListeners[event] = callback;
            document.addEventListener( event, callback.bind( this ) );
        };
        let self = this;
        let dragLeaveTimeout: any;

        registerGlobalEvent( "dragover", ( event: DragEvent ) => {

            event.preventDefault();

            if ( this.fileDropzoneElement.nativeElement.contains(event.target) )
            {
                event.dataTransfer.dropEffect = "copy";
            }
            else
            {
                event.dataTransfer.dropEffect = "none";
            }

            if ( !self.isFileDragged )
            {
                self.isFileDragged = true;
                self.changeDetector.detectChanges();
            }

            if ( dragLeaveTimeout )
            {
                clearTimeout( dragLeaveTimeout );
                dragLeaveTimeout = null;
            }
        });

        registerGlobalEvent( "dragleave", ( event: DragEvent ) => {
            dragLeaveTimeout = setTimeout( () => {
                self.isFileDragged = false;
                self.changeDetector.detectChanges();
                dragLeaveTimeout = null;
            }, 100 );
        });

        registerGlobalEvent( "drop", ( event: DragEvent ) => {
            event.preventDefault();
            event.stopPropagation();
            self.isFileDragged = false;
            self.changeDetector.detectChanges();
            dragLeaveTimeout = null;
        });

        // TODO: unsubscribe on destroy
        this.frontendStorageService.listFiles().subscribe( (objectList: TerraStorageObjectList) => {
            this.storageList = objectList;
            this.changeDetector.detectChanges();
        });
    }

    public ngOnDestroy(): void
    {
        Object.keys( this._globalListeners ).forEach(event => {
            document.removeEventListener( event, this._globalListeners[event] );
        });
        this._globalListeners = {};
    }

    public selectObject( object: TerraStorageObject ): void
    {
        if ( object.isDirectory )
        {
            this._currentRoot = object;
        }
        else
        {
            this.selectedStorageObject = object;
        }
    }

    public showFileChooser(): void
    {
        this.fileChooserElement.nativeElement.click();
    }

    public createDirectory(): void
    {
        if ( !this.newDirectoryName )
        {
            this.showNewDirectoryPrompt = true;
        }
        else
        {
            let path: string = this.currentRoot ? this.currentRoot.key : "/";
            path = PathHelper.join( path, this.newDirectoryName );
            this.showNewDirectoryPrompt = false;
            this.newDirectoryName = null;
            this.frontendStorageService.createDirectory( path );
        }
    }

    public setNewDirectoryName( value: string )
    {
        this.newDirectoryName = this.frontendStorageService.prepareKey( value, true );
    }

    public dropFiles( event: DragEvent ): void
    {
        event.preventDefault();
        event.stopPropagation();
        this.isFileDragged = false;
        this.changeDetector.detectChanges();

        this.frontendStorageService
            .uploadFiles( event.dataTransfer.files || [], this.getUploadPrefix() );
        /*
            .forEach( (uploadItem) => {
                this.uploadProgresses[uploadItem.pathname] = 0;
                uploadItem
                    .onProgress( (progress: number) => {
                        this.uploadProgresses[uploadItem.pathname] = progress;
                        this.changeDetector.detectChanges();
                    })
                    .onError( () => {
                        this.storageList.root.removeChild(uploadItem.pathname);
                        this.changeDetector.detectChanges();
                    })
                    .onCancel( () => {
                        this.storageList.root.removeChild(uploadItem.pathname);
                        this.changeDetector.detectChanges();
                    });
            });
            */
    }

    public selectFiles( event: Event ): void
    {
        if ( event.srcElement )
        {
            this.frontendStorageService
                .uploadFiles( (<any>event.srcElement).files || [], this.getUploadPrefix() );
            /*
                .forEach( (uploadItem) => {
                    this.uploadProgresses[uploadItem.pathname] = 0;
                    uploadItem
                        .onProgress( (progress: number) => {
                            this.uploadProgresses[uploadItem.pathname] = progress;
                            this.changeDetector.detectChanges();
                        })
                        .onError( () => {
                            this.storageList.root.removeChild(uploadItem.pathname);
                            this.changeDetector.detectChanges();
                        })
                        .onCancel( () => {
                            this.storageList.root.removeChild(uploadItem.pathname);
                            this.changeDetector.detectChanges();
                        });
                });
            */
        }
    }

    private getUploadPrefix(): string
    {
        if ( this.currentRoot )
        {
            return this.currentRoot.key;
        }
        return "/";
    }

    public deleteObject(): void
    {
        if ( this.selectedStorageObject && this.selectedStorageObject.key === this.deletableObjectKey )
        {
            this.selectedStorageObject = null;
        }

        if ( this.currentRoot && this.currentRoot.key === this.deletableObjectKey )
        {
            this._currentRoot = this.currentRoot.parent;
        }

        this.frontendStorageService.deleteObjects( [this.deletableObjectKey] );
        this.deletableObjectKey = null;
    }

    public copyToClipboard( event: TerraTextInputComponent ): void
    {
        ClipboardHelper.copyText( this.selectedStorageObject.publicUrl );
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

    public getSizeString( size: number ): string
    {
        if ( typeof size !== "number" )
        {
            return "0B";
        }
        return PathHelper.sizeString( size );
    }

    public getFormattedDate( date: Date ): string
    {
        return moment( date ).format('YYYY-MM-DD HH:mm');
    }
}
