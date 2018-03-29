import { TerraUploadItem } from './terra-upload-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TerraUploadProgress } from './terra-upload-progress';

export type UploadQueueUrlFactory = (storageKey:string) => string;

export class TerraUploadQueue
{
    public progress:Observable<number>;
    public inProgress:Promise<void>;
    public status:BehaviorSubject<TerraUploadProgress> = new BehaviorSubject<TerraUploadProgress>(null);

    private items:Array<TerraUploadItem> = [];
    private size:number = 0;

    private _progressListeners:Array<Observer<number>> = [];
    private _progressValue:number = -1;

    constructor(private _uploadUrl:string | UploadQueueUrlFactory, private _uploadMethod:'GET' | 'POST' | 'DELETE' | 'PUT' = 'POST')
    {
        this.progress = new Observable((observer:Observer<number>):Function =>
        {
            this._progressListeners.push(observer);
            observer.next(this._progressValue);

            return ():void =>
            {
                let idx:number = this._progressListeners.indexOf(observer);
                if(idx >= 0)
                {
                    this._progressListeners.splice(idx, 1);
                }
            };
        });
    }

    public add(item:TerraUploadItem):TerraUploadQueue
    {
        this.items.push(item);
        this.size += item.file.size;
        if(this.inProgress)
        {
            this.onProgress();
        }
        return this;
    }

    public remove(item:TerraUploadItem):TerraUploadQueue
    {
        let idx:number = this.items.indexOf(item);
        this.items.splice(idx, 1);
        this.size -= item.file.size;
        if(this.inProgress)
        {
            this.onProgress();
        }
        return this;
    }

    public startUpload():Promise<void>
    {
        if(this.items.length <= 0)
        {
            return Promise.resolve();
        }

        if(this.inProgress)
        {
            return this.inProgress;
        }

        this.inProgress = this.uploadAllItems()
                              .then(() =>
                              {
                                  this.inProgress = null;
                                  this.items = [];
                                  this.size = 0;
                              });
    }

    private uploadAllItems():Promise<void>
    {
        return new Promise((resolve:(resp:void) => void, reject:(err:any) => void):void =>
        {
            // let nextItem:TerraUploadItem = this.items.shift();
            let nextItem:TerraUploadItem = this.items.find((item:TerraUploadItem) => !item.uploaded);

            if(isNullOrUndefined(nextItem))
            {
                // all items are uploaded
                this.items = [];
                this.status.next(null);
                resolve(null);
            }
            else
            {
                this.uploadItem(nextItem).then(() =>
                {
                    this.uploadAllItems().then(resolve).catch(reject);
                }).catch(reject);
            }
        });
    }

    private uploadItem(item:TerraUploadItem):Promise<void>
    {
        return new Promise((resolve:(resp:void) => void, reject:(err:any) => void):void =>
        {
            let xhr:XMLHttpRequest = item._xhr = new XMLHttpRequest();

            item.emit('beforeUpload', item.file);

            xhr.upload.onprogress = (event:ProgressEvent):void =>
            {
                let progress:number = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
                item.emit('onProgress', progress);
                this.onProgress();
            };

            xhr.onload = ():void =>
            {
                item.emit('onSuccess', xhr.response, xhr.status, this.parseHeaders(xhr.getAllResponseHeaders()));
                item.uploaded = true;
                this.onProgress();
                resolve(null);
            };

            xhr.onerror = ():void =>
            {
                item.emit('onError', xhr.response, xhr.status, this.parseHeaders(xhr.getAllResponseHeaders()));
                item.uploaded = true;
                this.onProgress();
                reject(xhr.response);
            };

            xhr.onabort = ():void =>
            {
                item.emit(
                    'onCancel',
                    xhr.response,
                    xhr.status,
                    this.parseHeaders(xhr.getAllResponseHeaders())
                );
                item.uploaded = true;
                this.onProgress();
                reject(xhr.response);
            };

            xhr.open(
                this._uploadMethod,
                this.getUploadUrl(item.pathname),
                true
            );

            if(localStorage.getItem('accessToken'))
            {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
            }

            xhr.send(item.file);
        });

    }

    private onProgress():void
    {
        let filesUploaded:Array<TerraUploadItem> = this.items.filter( (item:TerraUploadItem) => item.uploaded);
        let sizeUploaded:number = filesUploaded
            .map( (item:TerraUploadItem) => item.file.size)
            .reduce((prev:number, current:number) => prev + current, 0);

        let progress:number = 100 - Math.round(((this.size - sizeUploaded) / this.size) * 100);

        this._progressListeners.forEach((listener:Observer<number>) =>
        {
            listener.next(progress || 0);
        });


        this.status.next({
            filesTotal: this.items.length,
            filesUploaded: filesUploaded.length,
            sizeTotal: this.size,
            sizeUploaded: sizeUploaded,
            progress: progress
        });
    }

    private parseHeaders(headers:string):{ [key:string]:string }
    {
        let parsed:{ [key:string]:string } = {};
        headers.split('\n').forEach((header:string) =>
        {
            let pivot:number = header.indexOf(':');
            let key:string = header.substr(0, pivot).trim().toLowerCase();
            let value:string = header.substr(pivot + 1).trim();
            if(!isNullOrUndefined(key))
            {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + value : value;
            }
        });
        return parsed;
    }

    private getUploadUrl(storageKey:string):string
    {
        if(typeof this._uploadUrl === 'function')
        {
            return this._uploadUrl(storageKey);
        }
        else
        {
            return this._uploadUrl + '?key=' + storageKey;
        }
    }
}
