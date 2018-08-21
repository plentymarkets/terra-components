import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { isNullOrUndefined } from 'util';
import { PathHelper } from '../../../helpers/path.helper';

export type UploadCallback = (response:string, status:number, headers:{ [key:string]:string }) => void;

export class TerraUploadItem
{
    public static DONE:TerraUploadItem = new TerraUploadItem(null, null, null);

    public xhr:XMLHttpRequest;
    public uploaded:boolean = false;

    public get filename():string
    {
        let filenames:Array<string> = this.file.name.split('.');
        let extname:string = filenames.pop();
        return this._uploadService.prepareKey(this.file.name, true);
    }

    public get pathname():string
    {
        let pathname:string = this._uploadService.prepareKey(PathHelper.join(this._path, this.filename));

        if(pathname.charAt(0) === '/')
        {
            pathname = pathname.substr(1);
        }

        return pathname;
    }

    private _beforeUpload:Array<(file:File) => void> = [];
    private _onSuccess:Array<UploadCallback> = [];
    private _onCancel:Array<UploadCallback> = [];
    private _onError:Array<UploadCallback> = [];
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
        if(!isNullOrUndefined(this.xhr))
        {
            this.xhr.abort();
        }
    }


    public emit(event:string, ...args:Array<any>):void
    {
        if(['beforeUpload',
            'onSuccess',
            'onError',
            'onCancel',
            'onProgress'].indexOf(event) >= 0)
        {
            this['_' + event].forEach((callback:(...args:Array<any>) => void) =>
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
}
