import { createS3StorageObject, S3StorageObjectInterface } from './s3-storage-object.interface';
import { isNullOrUndefined } from 'util';
import { PathHelper } from '../../../helpers/path.helper';
import { FileTypeHelper } from '../../../helpers/fileType.helper';

export class TerraStorageObject {
    private _s3Object: S3StorageObjectInterface;
    private _children: Array<TerraStorageObject> = [];
    private _parent: TerraStorageObject;

    public get eTag(): string {
        return this._s3Object.eTag;
    }

    public get key(): string {
        return this._s3Object.key;
    }

    public get publicUrl(): string {
        return this._s3Object.publicUrl;
    }

    public get previewUrl(): string {
        return this._s3Object.previewUrl || this._s3Object.publicUrl;
    }

    public get lastModified(): Date {
        return new Date(this._s3Object.lastModified);
    }

    public get size(): number {
        return parseInt(this._s3Object.size + '', 10);
    }

    public get sizeString(): string {
        if (isNaN(this.size)) {
            return '0B';
        }
        return PathHelper.sizeString(this.size);
    }

    public get name(): string {
        return PathHelper.basename(this._s3Object.key);
    }

    public get icon(): string {
        if (this.isDirectory) {
            return 'icon-folder';
        }

        return FileTypeHelper.mapIconClass(this.name);
    }

    public get isDirectory(): boolean {
        return PathHelper.isDirectory(this._s3Object.key);
    }

    public get isFile(): boolean {
        return PathHelper.isFile(this._s3Object.key);
    }

    public get parent(): TerraStorageObject {
        return this._parent;
    }

    public get hasChildren(): boolean {
        return this.isFile ? false : this._children.length > 0;
    }

    public get children(): Array<TerraStorageObject> {
        if (this.isFile) {
            return [];
        }

        return this._children.sort((childA: TerraStorageObject, childB: TerraStorageObject) => {
            if (childA.name > childB.name) {
                return -1;
            }
            if (childA.name < childB.name) {
                return 1;
            }
            return 0;
        });
    }

    public get fileCount(): number {
        if (this.isFile) {
            return 1;
        } else {
            return this.children
                .map((child: TerraStorageObject) => {
                    return child.fileCount;
                })
                .reduce((sum: number, current: number) => {
                    return sum + current;
                }, 0);
        }
    }

    constructor(s3Object: S3StorageObjectInterface, parent?: TerraStorageObject) {
        this._s3Object = s3Object;
        this._parent = parent;
    }

    public addChild(s3object: S3StorageObjectInterface, paths?: Array<string>): void {
        if (this.isFile) {
            console.error('Cannot add child object to file-like object.');
            return;
        }

        paths = paths || s3object.key.split(PathHelper.DELIMITER);
        while (paths.length > 0 && paths[0].length <= 0) {
            paths.shift();
        }

        let lastIdx: number = paths.length - 1;
        while (lastIdx > 0 && paths[lastIdx].length <= 0) {
            paths.pop();
            lastIdx--;
        }

        if (paths.length === 1) {
            let object: TerraStorageObject = new TerraStorageObject(s3object, this);
            if (this.hasChild(object.name)) {
                let idx: number = this._children.findIndex((child: TerraStorageObject) => {
                    return child.name === object.name;
                });
                this._children[idx] = object;
            } else {
                this._children.push(object);
            }
        } else {
            let nextPath: string = paths.shift();
            let child: TerraStorageObject = this.getChild(nextPath);
            if (!child) {
                let s3Object: S3StorageObjectInterface = createS3StorageObject(
                    PathHelper.join(this.key, nextPath) + '/'
                );
                child = new TerraStorageObject(s3Object, this);
                this.children.push(child);
            }

            child.addChild(s3object, paths);
        }
    }

    public removeChild(key: string): void {
        let paths: Array<string> = this.splitKeyIntoPaths(key);
        let nextPath: string = paths.shift();
        let child: TerraStorageObject = this.getChild(nextPath);
        if (child) {
            if (paths.length > 0) {
                child.removeChild(paths.join('/'));
            } else {
                let idx: number = this._children.indexOf(child);
                this._children.splice(idx, 1);
            }
        }
    }

    public getChild(name: string): TerraStorageObject {
        return this._children.find((child: TerraStorageObject) => {
            return child.name === name;
        });
    }

    public hasChild(name: string): boolean {
        return this._children.some((child: TerraStorageObject) => {
            return child.name === name;
        });
    }

    public find(key: string): TerraStorageObject {
        if (isNullOrUndefined(key)) {
            return null;
        }

        let paths: Array<string> = this.splitKeyIntoPaths(key);
        let nextPath: string = paths.shift();
        let child: TerraStorageObject = this.getChild(nextPath);
        if (!isNullOrUndefined(child)) {
            if (paths.length > 0) {
                return child.find(paths.join('/'));
            }

            return child;
        }

        return null;
    }

    private splitKeyIntoPaths(key: string): Array<string> {
        return key.split('/').filter((part: string): boolean => part.length > 0);
    }
}
