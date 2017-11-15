import { TerraStorageObject } from './terra-storage-object';
import {
    createS3StorageObject,
    S3StorageObjectInterface
} from './s3-storage-object.interface';

export class TerraStorageObjectList
{
    public root:TerraStorageObject;

    constructor()
    {
        this.root = new TerraStorageObject(createS3StorageObject('/'));
    }

    public insertObjects(objects:S3StorageObjectInterface[]):TerraStorageObjectList
    {
        objects.forEach((object:S3StorageObjectInterface) =>
        {
            this.insertObject(object);
        });
        return this;
    }

    public insertObject(s3object:S3StorageObjectInterface):TerraStorageObjectList
    {
        this.root.addChild(s3object);
        return this;
    }

    public get flatList():TerraStorageObject[]
    {
        let result = [];
        let appendChildren = (object:TerraStorageObject) =>
        {
            result.push(object);
            object.children
                  .forEach((child:TerraStorageObject) =>
                  {
                      appendChildren(child);
                  });
        };

        appendChildren(this.root);

        return result;
    }
}
