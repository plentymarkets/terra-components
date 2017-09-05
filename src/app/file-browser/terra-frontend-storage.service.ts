import { Injectable } from "@angular/core";
import { TerraUploadItem } from "./model/terra-upload-item";
import { TerraUploadQueue } from "./model/terra-upload-queue";
import { TerraBaseService } from "../service/terra-base.service";
import { TerraLoadingSpinnerService } from "../loading-spinner/service/terra-loading-spinner.service";
import { Http } from "@angular/http";
import { TerraStorageObjectList } from "./model/terra-storage-object-list";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { createS3StorageObject } from "./model/s3-storage-object.interface";

@Injectable()
export class TerraFrontendStorageService extends TerraBaseService
{
    private _storageInitialized: boolean = false;
    private _storageObjectList: TerraStorageObjectList;
    private _storageObservers: Array<Observer<TerraStorageObjectList>> = [];

    public queue: TerraUploadQueue = new TerraUploadQueue();

    public get uploadProgress(): Observable<number>
    {
        return this.queue.progress;
    }

    constructor(
         _terraLoadingSpinnerService: TerraLoadingSpinnerService,
         _http: Http
    )
    {
        super(
            _terraLoadingSpinnerService,
            _http,
            "/rest/storage/frontend/file"
        );
    }

    public prepareKey( value: string, isName: boolean = false ): string
    {
        value = value
            .replace( /\s+/g, '_' )                 // Replace whitespaces
            .replace( /ä/g, 'ae' )                  // Replace special characters
            .replace( /ö/g, 'oe' )
            .replace( /ü/g, 'ue' )
            .replace( /Ä/g, 'Ae' )
            .replace( /Ö/g, 'Oe' )
            .replace( /Ü/g, 'Ue' )
            .replace( /ß/g, 'ss' )
            .replace( /[^A-Za-z0-9\-_\/.]/g, '' );     // Remove all remaining special characters

        if ( isName )
        {
            // remove slashes in names to avoid creating subdirectories
            value = value.replace(/\//g, '');
        }

        return value;
    }

    public createDirectory( path: string ): Observable<void>
    {
        if ( path.charAt(0) === "/" )
        {
            path = path.substr( 1 );
        }

        if ( path.charAt( path.length - 1 ) !== "/" )
        {
            path += "/";
        }

        path = this.prepareKey( path );

        this.setAuthorization();
        let request: Observable<void> = this.mapRequest(
            this.http.post(
                this.url + "?key=" + path,
                null,
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe( () => {
            this._storageObjectList.insertObject(
                createS3StorageObject( path )
            );
            this.notifyObservers();
        });

        return request;
    }

    public uploadFiles( files: FileList | File[], path: string = "/" ): TerraUploadItem[]
    {
        if ( !files || files.length <= 0 )
        {
            return [];
        }

        let uploadItems: Array<TerraUploadItem> = [];
        for( let i = 0; i < files.length; i++ )
        {
            uploadItems.push(
                this.uploadFile( files[i], path )
            );
        }

        return uploadItems;
    }

    public uploadFile( file: File, path: string = "/" ): TerraUploadItem
    {
        if ( !file )
        {
            return TerraUploadItem.DONE;
        }

        let item: TerraUploadItem = new TerraUploadItem( file, path, this );
        item.beforeUpload( () => {
            this._storageObjectList.insertObject(
                createS3StorageObject( item.pathname )
            );
            this.notifyObservers();
        });

        item.onSuccess( (response) => {
            let s3Data: any = JSON.parse( response );
            this._storageObjectList.insertObject({
                eTag: s3Data.eTag,
                key: s3Data.key,
                lastModified: (new Date()).toISOString(),
                size: file.size,
                publicUrl: s3Data.publicUrl,
                storageClass: "STANDARD"
            });
            this.notifyObservers();
        });

        item.onError( () => {
            this._storageObjectList.root.removeChild( item.pathname );
            this.notifyObservers();
        });

        item.onCancel( () => {
            this._storageObjectList.root.removeChild( item.pathname );
            this.notifyObservers();
        });

        this.queue.add( item );

        this.queue.startUpload();

        return item;
    }

    public listFiles(): Observable<TerraStorageObjectList>
    {
        return new Observable( (observer: Observer<TerraStorageObjectList>) => {
            if ( this._storageInitialized )
            {
                observer.next( this._storageObjectList );
            }
            else
            {
                this.initStorageList();
            }

            this._storageObservers.push( observer );

            return () => {
                let idx: number = this._storageObservers.indexOf( observer );
                this._storageObservers.splice( idx, 1 );
            }
        });
    }

    public deleteFile( key: string ): Observable<void>
    {

        this.setAuthorization();
        let request = this.mapRequest(
            this.http.delete(
                this.url + "?key=" + key,
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe(
            () => {
                this._storageObjectList.root.removeChild( key );
                this.notifyObservers();
            },
            err => {
                this._storageInitialized = false;
                this._storageObjectList = null;
                this.notifyObservers();
            }
        );

        return request;
    }

    private initStorageList( continuationToken?: string ): Promise<void>
    {
        this._storageInitialized = true;

        let url = "/rest/storage/frontend/files";
        if ( continuationToken )
        {
            url += "?continuationToken=" + continuationToken;
        }

        return new Promise( (resolve: (resp: void) => void, reject: (err: any) => void) => {
            this.setAuthorization();
            this.mapRequest(
                this.http.get(
                    url,
                    {
                        headers: this.headers
                    }
                )
            ).subscribe(
                results => {

                    if ( !this._storageObjectList )
                    {
                        this._storageObjectList = new TerraStorageObjectList();
                    }
                    this._storageObjectList.insertObjects( results.objects );
                    this.notifyObservers();

                    if ( results.isTruncated && results.nextContinuationToken.length > 0 )
                    {
                        this.initStorageList( results.nextContinuationToken )
                            .then( resolve )
                            .catch( reject );
                    }
                    else
                    {
                        resolve(null);
                    }
                },
                err => {
                    reject( err );
                    this._storageInitialized = false;
                    this._storageObjectList = null;
                    this.notifyObservers();
                }
            );
        });
    }

    private notifyObservers(): void
    {
        this._storageObservers.forEach( observer => {
            observer.next( this._storageObjectList );
        });
    }
}