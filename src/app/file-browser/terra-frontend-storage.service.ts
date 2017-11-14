import { Injectable } from '@angular/core';
import { TerraUploadItem } from './model/terra-upload-item';
import { TerraUploadQueue } from './model/terra-upload-queue';
import { TerraLoadingSpinnerService } from '../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';
import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { Observable } from 'rxjs/Observable';
import { createS3StorageObject } from './model/s3-storage-object.interface';
import { TerraBaseMetadataStorageService } from './terra-base-storage.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TerraImageMetadata } from './model/terra-image-metadata.interface';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';

@Injectable()
export class TerraFrontendStorageService extends TerraBaseMetadataStorageService
{
    public isPublic:boolean = true;

    public name:string;

    private _storageInitialized:boolean = false;

    private _storageListSubject:BehaviorSubject<TerraStorageObjectList> = new BehaviorSubject(null);

    private get _storageList():TerraStorageObjectList
    {
        return this._storageListSubject.getValue();
    }

    public queue:TerraUploadQueue = new TerraUploadQueue('/rest/storage/frontend/file');

    public get uploadProgress():Observable<number>
    {
        return this.queue.progress;
    }

    private _metadataCache:{ [storageKey:string]:TerraImageMetadata } = {};

    constructor(_terraLoadingSpinnerService:TerraLoadingSpinnerService, _http:Http, _translation:TranslationService)
    {
        super(_terraLoadingSpinnerService, _http, '/rest/storage/frontend/file');
        this.name = _translation.translate('terraFileBrowser.myFiles');
    }

    public getStorageList():Observable<TerraStorageObjectList>
    {
        if(!this._storageInitialized)
        {
            this.initStorageList();
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
        let request:Observable<void> = this.mapRequest(
            this.http.post(
                this.url + '?key=' + path,
                null,
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe(() =>
        {
            this._storageListSubject.next(
                this._storageList.insertObject(createS3StorageObject(path))
            );
        });

        return request;
    }

    public uploadFiles(files:FileList | File[], path:string = '/'):TerraUploadItem[]
    {
        if(isNullOrUndefined(files) || files.length <= 0)
        {
            return [];
        }

        let uploadItems:Array<TerraUploadItem> = [];
        for(let i = 0; i < files.length; i++)
        {
            uploadItems.push(this.uploadFile(files[i], path));
        }

        return uploadItems;
    }

    private uploadFile(file:File, path:string = '/'):TerraUploadItem
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

        item.onSuccess((response) =>
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
        });

        item.onError(() =>
        {
            this._storageList.root.removeChild(item.pathname);
            this._storageListSubject.next(this._storageList);
        });

        item.onCancel(() =>
        {
            this._storageList.root.removeChild(item.pathname);
            this._storageListSubject.next(this._storageList);
        });

        this.queue.add(item);

        this.queue.startUpload();

        return item;
    }

    public getMetadata(key:string):Observable<TerraImageMetadata>
    {
        if(this._metadataCache.hasOwnProperty(key))
        {
            return Observable.from([this._metadataCache[key]]);
        }

        this.setAuthorization();
        let request = this.mapRequest(
            this.http.get(
                this.url + '/metadata?key=' + key,
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe(
            (metadata) =>
            {
                this._metadataCache[key] = metadata;
            },
            () =>
            {
                delete this._metadataCache[key];
            }
        );

        return request;
    }

    public updateMetadata(key:string, metadata:TerraImageMetadata):Observable<any>
    {
        this.setAuthorization();
        let request = this.mapRequest(
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
        );

        request.subscribe(
            () =>
            {
                this._metadataCache[key] = metadata;
            },
            () =>
            {
                delete this._metadataCache[key];
            }
        );

        return request;
    }

    public deleteFiles(keyList:string[]):Observable<void>
    {
        this.setAuthorization();
        let request = this.mapRequest(
            this.http.delete(
                '/rest/storage/frontend/files?' + keyList.map(key => 'keyList[]=' + key).join('&'),
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe(
            () =>
            {
                keyList.forEach(key => this._storageList.root.removeChild(key));
                this._storageListSubject.next(this._storageList);
            },
            err =>
            {
                this._storageInitialized = false;
                this._storageListSubject.next(null);
            }
        );

        return request;
    }

    private initStorageList(continuationToken?:string):void
    {
        this._storageInitialized = true;

        let url = '/rest/storage/frontend/files';
        if(!isNullOrUndefined(continuationToken))
        {
            url += '?continuationToken=' + continuationToken;
        }

        this.setAuthorization();
        this.mapRequest(
            this.http.get(url, {headers: this.headers})
        ).subscribe(results =>
            {
                let storageList:TerraStorageObjectList = this._storageListSubject.getValue() || new TerraStorageObjectList();
                storageList.insertObjects(results.objects);
                this._storageListSubject.next(storageList);

                if(results.isTruncated && results.nextContinuationToken.length > 0)
                {
                    this.initStorageList(results.nextContinuationToken);
                }
            },
            err =>
            {
                console.error(err);
                this._storageInitialized = false;
                this._storageListSubject.next(null);
            }
        );
    }
}
