import { TerraStorageObject } from "./terra-storage-object";
import {
    createS3StorageObject,
    S3StorageObjectInterface
} from "./s3-storage-object.interface";

export class TerraStorageObjectList
{
    public root:TerraStorageObject;

    constructor()
    {
        this.root = new TerraStorageObject(createS3StorageObject("/"));
    }

    public insertObjects(objects:S3StorageObjectInterface[]):void
    {
        objects.forEach((object:S3StorageObjectInterface) =>
        {
            this.insertObject(object);
        });
    }

    public insertObject(s3object:S3StorageObjectInterface):void
    {
        this.root.addChild(s3object);
    }
}
