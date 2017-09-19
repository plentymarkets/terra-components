import {
    createS3StorageObject,
    S3StorageObjectInterface
} from "./s3-storage-object.interface";
import { PathHelper } from "../helper/path.helper";

export class TerraStorageObject
{
    private _s3Object:S3StorageObjectInterface;
    private _children:TerraStorageObject[] = [];
    private _parent:TerraStorageObject;

    public get eTag():string
    {
        return this._s3Object.eTag;
    }

    public get key():string
    {
        return this._s3Object.key;
    }

    public get publicUrl():string
    {
        return this._s3Object.publicUrl;
    }

    public get lastModified():Date
    {
        return new Date(this._s3Object.lastModified);
    }

    public get size():number
    {
        return this._s3Object.size;
    }

    public get name():string
    {
        return PathHelper.basename(this._s3Object.key);
    }

    public get isDirectory():boolean
    {
        return PathHelper.isDirectory(this._s3Object.key);
    }

    public get isFile():boolean
    {
        return PathHelper.isFile(this._s3Object.key);
    }

    public get parent():TerraStorageObject
    {
        return this._parent;
    }

    public get hasChildren():boolean
    {
        return this.isFile ? false : this._children.length > 0;
    }

    public get children():TerraStorageObject[]
    {
        if(this.isFile)
        {
            return [];
        }

        return this._children.sort((childA, childB) =>
        {
            if(childA.name > childB.name)
            {
                return -1;
            }
            if(childA.name < childB.name)
            {
                return 1;
            }
            return 0;
        });
    }

    constructor(s3Object:S3StorageObjectInterface, parent?:TerraStorageObject)
    {
        this._s3Object = s3Object;
        this._parent = parent;
    }

    public addChild(s3object:S3StorageObjectInterface, paths?:string[]):void
    {
        if(this.isFile)
        {
            console.error("Cannot add child object to file-like object.");
            return;
        }

        paths = paths || s3object.key.split(PathHelper.DELIMITER);
        while(paths.length > 0 && paths[0].length <= 0)
        {
            paths.shift();
        }

        let lastIdx:number = paths.length - 1;
        while(lastIdx > 0 && paths[lastIdx].length <= 0)
        {
            paths.pop();
            lastIdx--;
        }

        if(paths.length === 1)
        {
            let object:TerraStorageObject = new TerraStorageObject(s3object, this);
            if(this.hasChild(object.name))
            {
                let idx = this._children.findIndex((child:TerraStorageObject) =>
                {
                    return child.name === object.name;
                });
                this._children[idx] = object;
            }
            else
            {
                this._children.push(object);
            }
        }
        else
        {
            let nextPath:string = paths.shift();
            let child:TerraStorageObject = this.getChild(nextPath);
            if(!child)
            {
                let s3Object = createS3StorageObject(
                    PathHelper.join(this.key, nextPath) + "/"
                );
                child = new TerraStorageObject(s3Object, this);
                this.children.push(child);
            }

            child.addChild(s3object, paths);
        }
    }

    public removeChild(key:string):void
    {
        let paths:string[] = key.split("/").filter(path => path.length > 0);
        let nextPath = paths.shift();
        let child = this.getChild(nextPath);
        if(child)
        {
            if(paths.length > 0)
            {
                child.removeChild(paths.join("/"));
            }
            else
            {
                let idx = this._children.indexOf(child);
                this._children.splice(idx, 1);
            }
        }
    }

    public getChild(name:string):TerraStorageObject
    {
        return this._children.find((child:TerraStorageObject) =>
        {
            return child.name === name;
        });
    }

    public hasChild(name:string):boolean
    {
        return this._children.some((child:TerraStorageObject) =>
        {
            return child.name === name;
        });
    }

    public find(key:string):TerraStorageObject
    {
        if(!key)
        {
            return null;
        }

        let paths:string[] = key.split("/").filter(key => key.length > 0);
        let nextPath = paths.shift();
        let child = this.getChild(nextPath);
        if(child)
        {
            if(paths.length > 0)
            {
                return child.find(paths.join("/"));
            }

            return child;
        }

        return null;
    }
}