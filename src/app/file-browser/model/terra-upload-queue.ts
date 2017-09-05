import { TerraUploadItem } from "./terra-upload-item";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

export class TerraUploadQueue
{
    private items: Array<TerraUploadItem> = [];
    private size: number = 0;

    public progress: Observable<number>;
    public inProgress: Promise<void>;
    private _progressListeners: Array<Observer<number>> = [];
    private _progressValue: number = -1;

    constructor()
    {
        this.progress = new Observable( (observer: Observer<number>) => {
            this._progressListeners.push( observer );
            observer.next( this._progressValue );

            return () => {
                let idx: number = this._progressListeners.indexOf( observer );
                if ( idx >= 0 )
                {
                    this._progressListeners.splice( idx, 1 );
                }
            };
        });
    }

    public add( item: TerraUploadItem ): TerraUploadQueue
    {
        this.items.push( item );
        this.size += item.file.size;
        if ( this.inProgress )
        {
            this.onProgress();
        }
        return this;
    }

    public remove( item: TerraUploadItem ): TerraUploadQueue
    {
        let idx: number = this.items.indexOf( item );
        this.items.splice( idx, 1 );
        this.size -= item.file.size;
        if ( this.inProgress )
        {
            this.onProgress();
        }
        return this;
    }

    public startUpload(): Promise<void>
    {
        if ( this.items.length <= 0 )
        {
            return Promise.resolve();
        }

        if ( this.inProgress )
        {
            return this.inProgress;
        }

        this.inProgress = this.uploadAllItems()
            .then( () => {
                this.inProgress = null;
                this.items = [];
                this.size = 0;
            });
    }

    private uploadAllItems(): Promise<void>
    {
        return new Promise( (resolve: (resp: void) => void, reject: (err: any) => void) => {

            let nextItem: TerraUploadItem = this.items.shift();

            if ( !nextItem )
            {
                resolve( null );
            }
            else
            {
                this.uploadItem( nextItem )
                    .then( () => {
                        this.uploadAllItems()
                            .then( resolve )
                            .catch( reject );
                    })
                    .catch( reject );
            }


        });
    }

    private uploadItem( item: TerraUploadItem ): Promise<void>
    {
        return new Promise( (resolve: (resp: void) => void, reject: (err: any) => void) => {
            let xhr: XMLHttpRequest = item._xhr = new XMLHttpRequest();

            item.emit('beforeUpload', item.file );

            xhr.upload.onprogress = (event: ProgressEvent) => {
                let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
                item.emit( 'onProgress', progress );
                this.onProgress();
            };

            xhr.onload = () => {
                item.emit(
                    'onSuccess',
                    xhr.response,
                    xhr.status,
                    this.parseHeaders( xhr.getAllResponseHeaders() )
                );
                item.uploaded = true;
                this.onProgress();
                resolve(null);
            };

            xhr.onerror = () => {
                item.emit(
                    'onError',
                    xhr.response,
                    xhr.status,
                    this.parseHeaders( xhr.getAllResponseHeaders() )
                );
                item.uploaded = true;
                this.onProgress();
                reject( xhr.response );
            };

            xhr.onabort = () => {
                item.emit(
                    'onCancel',
                    xhr.response,
                    xhr.status,
                    this.parseHeaders( xhr.getAllResponseHeaders() )
                );
                item.uploaded = true;
                this.onProgress();
                reject( xhr.response );
            };

            xhr.open(
                "POST",
                "/rest/storage/frontend/file?key=" + item.pathname,
                true
            );

            if(localStorage.getItem('accessToken'))
            {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
            }

            xhr.send( item.file );
        });

    }

    private onProgress(): void
    {
        let notLoaded: number = this.items
            .map( (item: TerraUploadItem) => {
                return item.file.size;
            })
            .reduce( (prev: number, current: number) => {
                return prev + current;
            }, 0);

        let progress = 100 - Math.round( (notLoaded / this.size) * 100 );
        this._progressListeners.forEach( (listener: Observer<number>) => {
            listener.next( progress || 0 );
        });
    }

    private parseHeaders( headers: string ): {[key: string]: string}
    {
        let parsed: {[key: string]: string} = {};
        headers.split("\n").forEach( (header: string) => {
            let pivot = header.indexOf(":");
            let key: string = header.substr(0, pivot).trim().toLowerCase();
            let value: string = header.substr(pivot +1 ).trim();
            if ( key )
            {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + value : value;
            }
        });
        return parsed;
    }
}