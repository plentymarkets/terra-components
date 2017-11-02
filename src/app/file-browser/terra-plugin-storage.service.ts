import { TerraBaseStorageService } from './terra-base-storage.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { Observable } from 'rxjs/Observable';
import { TerraUploadItem } from './model/terra-upload-item';
import {
    Inject,
    Injectable,
    InjectionToken,
    Injector,
    ReflectiveInjector
} from '@angular/core';
import { TerraLoadingSpinnerService } from '../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';
import { createS3StorageObject } from './model/s3-storage-object.interface';
import { TerraUploadQueue } from './model/terra-upload-queue';

const PLUGIN_NAME_DI_TOKEN = new InjectionToken('TerraPluginStorageService.pluginName');

@Injectable()
export class TerraPluginStorageService extends TerraBaseStorageService
{
    public static create( pluginName: string, injector: Injector ): TerraPluginStorageService
    {
        let childInjector = ReflectiveInjector.resolveAndCreate(
            [
                TerraPluginStorageService,
                { provide: PLUGIN_NAME_DI_TOKEN, useValue: pluginName }
            ],
            injector
        );
        return childInjector.get(TerraPluginStorageService);

    }

    public name:string;

    public isPublic:boolean = false;

    public queue:TerraUploadQueue;

    private _storageList: BehaviorSubject<TerraStorageObjectList> = new BehaviorSubject(null);
    private _storageInitialized: boolean = false;

    private get _storagePrefix(): string
    {
        return this._pluginName + "/resources";
    }

    constructor(
        _terraLoadingSpinnerService: TerraLoadingSpinnerService,
        _http: Http,
        @Inject(PLUGIN_NAME_DI_TOKEN) private _pluginName: string)
    {
        super( _terraLoadingSpinnerService, _http, "/rest/storage/plugins/inbox/" );
        this.queue = new TerraUploadQueue((storageKey: string) => {
            return "/rest/storage/plugins/inbox/?prefix=" + this._storagePrefix + storageKey;
        });
        this.name = _pluginName;
    }

    public getStorageList():Observable<TerraStorageObjectList>
    {
        if ( !this._storageInitialized )
        {
            this.initStorageList();
        }

        return this._storageList;
    }

    public createDirectory(path:string):Observable<any>
    {
        if(path.charAt(0) === "/")
        {
            path = path.substr(1);
        }

        if(path.charAt(path.length - 1) !== "/")
        {
            path += "/";
        }

        path = this.prepareKey( path);

        this.setAuthorization();
        let request:Observable<void> = this.mapRequest(
            this.http.post(
                this.url + "?key=" + this._storagePrefix + path,
                null,
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe(() =>
                          {
                              this._storageList.next(
                                  this._storageList.getValue().insertObject( createS3StorageObject(path) )
                              );
                          });

        return request;
    }

    public uploadFiles(files:FileList | File[], path:string):TerraUploadItem[]
    {
        if(!files || files.length <= 0)
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

    public deleteFiles(keyList:string[]):Observable<any>
    {
        this.setAuthorization();
        let request = this.mapRequest(
            this.http.delete(
                this.url + "?" + keyList.map( key => "keyList[]=" + this._storagePrefix + key).join("&"),
                {
                    headers: this.headers
                }
            )
        );

        request.subscribe(
            () =>
            {
                let storageList: TerraStorageObjectList = this._storageList.getValue();
                keyList.forEach( key => storageList.root.removeChild( key ) );
                this._storageList.next( storageList );
            },
            err =>
            {
                this._storageInitialized = false;
                this._storageList.next( null );
            }
        );

        return request;
    }

    private uploadFile(file:File, path:string = "/"):TerraUploadItem
    {
        if(!file)
        {
            return TerraUploadItem.DONE;
        }

        let item:TerraUploadItem = new TerraUploadItem(file, path, this);
        item.beforeUpload(() =>
                          {
                              this._storageList.next(
                                  this._storageList.getValue().insertObject( createS3StorageObject(item.pathname) )
                              );
                          });

        item.onSuccess((response) =>
                       {
                           let s3Data:any = JSON.parse(response);
                           this._storageList.next(
                               this._storageList.getValue().insertObject({
                                                                  eTag:         s3Data.eTag,
                                                                  key:          s3Data.key,
                                                                  lastModified: (new Date()).toISOString(),
                                                                  size:         file.size,
                                                                  publicUrl:    s3Data.publicUrl,
                                                                  storageClass: "STANDARD"
                                                              })
                           );
                       });

        item.onError(() =>
                     {
                         let storageList: TerraStorageObjectList = this._storageList.getValue();
                         storageList.root.removeChild( item.pathname );
                         this._storageList.next( storageList );
                     });

        item.onCancel(() =>
                      {
                          let storageList: TerraStorageObjectList = this._storageList.getValue();
                          storageList.root.removeChild( item.pathname );
                          this._storageList.next( storageList );
                      });

        this.queue.add(item);

        this.queue.startUpload();

        return item;
    }

    private initStorageList(continuationToken:string = "")
    {
        this._storageInitialized = true;

        this.setAuthorization();
        this.mapRequest(
            this.http.get(
                this.url + "list/",
                {
                    params: {
                        prefix: this._storagePrefix,
                        continuationToken: continuationToken
                    },
                    headers: this.headers
                }
            )
        ).subscribe(
            result => {
                let storageList: TerraStorageObjectList = this._storageList.getValue() || new TerraStorageObjectList();
                storageList.insertObjects( result.objects );
                this._storageList.next( storageList );

                if ( result.isTruncated && result.nextContinuationToken.length > 0 )
                {
                    this.initStorageList( result.nextContinuationToken );
                }
            },
            err => {
                console.error( err );
                this._storageInitialized = false;
                this._storageList.next( null );
            }
        )
    }
}