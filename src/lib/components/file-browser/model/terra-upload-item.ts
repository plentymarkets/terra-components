import { TerraBaseStorageService } from '../terra-base-storage.interface';
import { isNullOrUndefined } from 'util';
import { PathHelper } from '../../../helpers/path.helper';

export type UploadCallback = (response: string, status: number, headers: { [key: string]: string }) => void;

export class TerraUploadItem {
    public static DONE: TerraUploadItem = new TerraUploadItem(null, null, null);

    public xhr: XMLHttpRequest;
    public uploaded: boolean = false;

    public get filename(): string {
        let filenames: Array<string> = this.file.name.split('.');
        let extname: string = filenames.pop();
        return this.uploadService.prepareKey(this.file.name, true);
    }

    public get pathname(): string {
        let pathname: string = this.uploadService.prepareKey(PathHelper.join(this.path, this.filename));

        if (pathname.charAt(0) === '/') {
            pathname = pathname.substr(1);
        }
        return pathname;
    }

    private _beforeUploadList: Array<(file: File) => void> = [];
    private _onSuccessList: Array<UploadCallback> = [];
    private _onCancelList: Array<UploadCallback> = [];
    private _onErrorList: Array<UploadCallback> = [];
    private _onProgressList: Array<(progress: number) => void> = [];

    constructor(public file: File, private path: string, private uploadService: TerraBaseStorageService) {
        if (isNullOrUndefined(file)) {
            this.uploaded = true;
        }
        if (this.path?.charAt(0) === '/') {
            this.path = this.path.substr(1);
        }
    }

    public beforeUpload(callback: (file: File) => void): TerraUploadItem {
        this._beforeUploadList.push(callback);
        return this;
    }

    public onSuccess(callback: UploadCallback): TerraUploadItem {
        this._onSuccessList.push(callback);
        return this;
    }

    public onError(callback: UploadCallback): TerraUploadItem {
        this._onErrorList.push(callback);
        return this;
    }

    public onCancel(callback: UploadCallback): TerraUploadItem {
        this._onCancelList.push(callback);
        return this;
    }

    public onProgress(callback: (progress: number) => void): TerraUploadItem {
        this._onProgressList.push(callback);
        return this;
    }

    public cancelUpload(): void {
        this.uploadService.queue.remove(this);
        if (!isNullOrUndefined(this.xhr)) {
            this.xhr.abort();
        }
    }

    public emit(event: string, ...args: Array<any>): void {
        if (['beforeUpload', 'onSuccess', 'onError', 'onCancel', 'onProgress'].indexOf(event) >= 0) {
            // TODO: this access is insecure since it breaks when the variables are renamed
            this['_' + event + 'List'].forEach((callback: (...args: Array<any>) => void) => {
                callback(...args);
            });

            if (['onSuccess', 'onError', 'onCancel'].indexOf(event) >= 0) {
                this.uploaded = true;
            }
        }
    }
}
