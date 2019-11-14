import { Injectable } from '@angular/core';
import { TerraUploadItem } from './model/terra-upload-item';
import { TerraUploadQueue } from './model/terra-upload-queue';
import { Http } from '@angular/http';
import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { createS3StorageObject } from './model/s3-storage-object.interface';
import { TerraImageMetadata } from './model/terra-image-metadata.interface';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { TerraLoadingSpinnerService } from '../loading-spinner/service/terra-loading-spinner.service';
import { TerraBaseMetadataStorageService } from './terra-base-metadata-storage.interface';
import { tap } from 'rxjs/operators';
import {
    BehaviorSubject,
    from,
    Observable
} from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class TerraFrontendStorageService extends TerraBaseMetadataStorageService
{
    public isImagePreviewEnabled:boolean = true;

    public name:string;

    public queue:TerraUploadQueue = new TerraUploadQueue('/rest/storage/frontend/file');

    private _storageInitialized:boolean = false;

    private _storageListSubject:BehaviorSubject<TerraStorageObjectList> = new BehaviorSubject(null);

    private get _storageList():TerraStorageObjectList
    {
        return this._storageListSubject.getValue();
    }

    public get uploadProgress():Observable<number>
    {
        return this.queue.progress;
    }

    private _metadataCache:{ [storageKey:string]:TerraImageMetadata } = {};

    constructor(terraLoadingSpinnerService:TerraLoadingSpinnerService,
                http:Http,
                private _translation:TranslationService,
                private _alertService:AlertService)
    {
        super(terraLoadingSpinnerService, http, '/rest/storage/frontend/file');
        this.name = _translation.translate('terraFileBrowser.myFiles');
    }

    public getStorageList():Observable<TerraStorageObjectList>
    {
        if(!this._storageInitialized)
        {
            this._initStorageList();
        }

        return this._storageListSubject;
    }

    public createDirectory(path:string):Observable<void>
    {
        if(path.charAt(0) === '/')
        {
            path = path.substr(1);
        }

        if(path.charAt(path.length - 1) !== '/')
        {
            path += '/';
        }

        path = this.prepareKey(path);

        this.setAuthorization();
        return this.mapRequest(
            this.http.post(
                this.url + '?key=' + path,
                null,
                {
                    headers: this.headers
                }
            )
        ).pipe(tap(() =>
        {
            this._storageListSubject.next(
                this._storageList.insertObject(createS3StorageObject(path))
            );
        }));
    }

    public uploadFiles(files:FileList | Array<File>, path:string = '/'):Array<TerraUploadItem>
    {
        if(isNullOrUndefined(files) || files.length <= 0)
        {
            return [];
        }

        let uploadItems:Array<TerraUploadItem> = [];

        /* tslint:disable:prefer-for-of */
        for(let i:number = 0; i < files.length; i++)
        {
            uploadItems.push(this._uploadFile(files[i], path));
        }
        /* tslint:enable:prefer-for-of */

        return uploadItems;
    }

    public getMetadata(key:string):Observable<TerraImageMetadata>
    {
        if(this._metadataCache.hasOwnProperty(key))
        {
            return from([this._metadataCache[key]]);
        }

        this.setAuthorization();
        return this.mapRequest(
            this.http.get(
                this.url + '/metadata?key=' + key,
                {
                    headers: this.headers
                }
            )
        ).pipe(tap((metadata:any) =>
            {
                this._metadataCache[key] = metadata;
            },
            () =>
            {
                delete this._metadataCache[key];
            }
        ));
    }

    public updateMetadata(key:string, metadata:TerraImageMetadata):Observable<any>
    {
        this.setAuthorization();
        return this.mapRequest(
            this.http.post(
                this.url + '/metadata',
                {
                    key:      key,
                    metadata: metadata
                },
                {
                    headers: this.headers
                }
            )
        ).pipe(tap(() =>
            {
                this._metadataCache[key] = metadata;
            },
            () =>
            {
                delete this._metadataCache[key];
            }
        ));
    }

    public deleteFiles(keyList:Array<string>):Observable<void>
    {
        this.setAuthorization();
        return this.mapRequest(
            this.http.delete(
                '/rest/storage/frontend/files?' + keyList.map((key:string):string => 'keyList[]=' + key).join('&'),
                {
                    headers: this.headers
                }
            )
        ).pipe(tap(():void =>
            {
                keyList.forEach((key:string):void => this._storageList.root.removeChild(key));
                this._storageListSubject.next(this._storageList);
            },
            ():void =>
            {
                this._storageInitialized = false;
                this._storageListSubject.next(null);
            }
        ));
    }

    private _uploadFile(file:File, path:string = '/'):TerraUploadItem
    {
        if(isNullOrUndefined(file))
        {
            return TerraUploadItem.DONE;
        }

        let item:TerraUploadItem = new TerraUploadItem(file, path, this);
        item.beforeUpload(() =>
        {
            this._storageListSubject.next(
                this._storageList.insertObject(createS3StorageObject(item.pathname))
            );
        });

        item.onSuccess((response:string, status:number) =>
        {
            if(status === 413)
            {
                this._cleanStorageList(item);
                this._alertService.error(this._translation.translate('terraFileBrowser.error.tooLargePayload'));
            }
            else
            {
                let s3Data:any = JSON.parse(response);
                this._storageListSubject.next(
                    this._storageList.insertObject({
                        eTag:         s3Data.eTag,
                        key:          s3Data.key,
                        lastModified: (new Date()).toISOString(),
                        size:         file.size,
                        publicUrl:    s3Data.publicUrl,
                        storageClass: 'STANDARD'
                    })
                );
            }
        });

        item.onError(() =>
        {
            this._cleanStorageList(item);
        });

        item.onCancel(() =>
        {
            this._cleanStorageList(item);
        });

        this.queue.add(item);

        this.queue.startUpload();

        return item;
    }

    private _cleanStorageList(item:any):void
    {
        this._storageList.root.removeChild(item.pathname);
        this._storageListSubject.next(this._storageList);
    }

    private _initStorageList(continuationToken?:string):void
    {
        this._storageInitialized = true;

        let url:string = '/rest/storage/frontend/files';
        if(!isNullOrUndefined(continuationToken))
        {
            url += '?continuationToken=' + encodeURIComponent(continuationToken);
        }

        this.setAuthorization();
        this.mapRequest(this.http.get(url, {headers: this.headers})).subscribe((results:any):void =>
            {
                let storageList:TerraStorageObjectList = this._storageListSubject.getValue() || new TerraStorageObjectList();
                storageList.insertObjects(results.objects);
                this._storageListSubject.next(storageList);

                if(results.isTruncated && results.nextContinuationToken.length > 0)
                {
                    this._initStorageList(results.nextContinuationToken);
                }
            },
            (err:any):void =>
            {
                console.error(err);
                this._storageInitialized = false;
                this._storageListSubject.next(null);
            }
        );
    }
}
