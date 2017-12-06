import { PathHelper } from '../helper/path.helper';
import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { isNullOrUndefined } from 'util';

export type UploadCallback = (response:string, status:number, headers:{ [key:string]:string }) => void;

export class TerraUploadItem
{
    public _xhr:XMLHttpRequest;
    public uploaded:boolean = false;

    public get filename():string
    {
        let filenames = this.file.name.split('.');
        let extname = filenames.pop();
        return this._uploadService.prepareKey(this.file.name, true);
    }

    public get pathname():string
    {
        let pathname = this._uploadService.prepareKey(PathHelper.join(this._path, this.filename));

        if(pathname.charAt(0) === '/')
        {
            pathname = pathname.substr(1);
        }

        return pathname;
    }

    private _beforeUpload:Array<(file:File) => void> = [];
    private _onSuccess:UploadCallback[] = [];
    private _onCancel:UploadCallback[] = [];
    private _onError:UploadCallback[] = [];
    private _onProgress:Array<(progress:number) => void> = [];

    constructor(public file:File, private _path:string, private _uploadService:TerraBaseStorageService)
    {
        if(isNullOrUndefined(file))
        {
            this.uploaded = true;
        }
        if(!isNullOrUndefined(this._path) && this._path.charAt(0) === '/')
        {
            this._path = this._path.substr(1);
        }
    }

    public beforeUpload(callback:(file:File) => void):TerraUploadItem
    {
        this._beforeUpload.push(callback);
        return this;
    }

    public onSuccess(callback:UploadCallback):TerraUploadItem
    {
        this._onSuccess.push(callback);
        return this;
    }

    public onError(callback:UploadCallback):TerraUploadItem
    {
        this._onError.push(callback);
        return this;
    }

    public onCancel(callback:UploadCallback):TerraUploadItem
    {
        this._onCancel.push(callback);
        return this;
    }

    public onProgress(callback:(progress:number) => void):TerraUploadItem
    {
        this._onProgress.push(callback);
        return this;
    }

    public cancelUpload():void
    {
        this._uploadService.queue.remove(this);
        if(!isNullOrUndefined(this._xhr))
        {
            this._xhr.abort();
        }
    }


    public emit(event:string, ...args:any[]):void
    {
        if(['beforeUpload',
            'onSuccess',
            'onError',
            'onCancel',
            'onProgress'].indexOf(event) >= 0)
        {
            this['_' + event].forEach((callback:(...args:any[]) => void) =>
            {
                callback(...args);
            });

            if(['onSuccess',
                'onError',
                'onCancel'].indexOf(event) >= 0)
            {
                this.uploaded = true;
            }
        }
    }

    public static DONE:TerraUploadItem = new TerraUploadItem(null, null, null);
}
