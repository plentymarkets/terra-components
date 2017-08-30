import { TerraStorageObject } from "./terra-storage-object";
import { createS3StorageObject, S3StorageObject } from "./s3-storage-object.interface";
export class TerraStorageObjectList
{
    public root: TerraStorageObject;

    constructor()
    {
        this.root = new TerraStorageObject(
            createS3StorageObject("/")
        )
    }

    public insertObjects( objects: S3StorageObject[] ): void
    {
        objects.forEach( (object: S3StorageObject) => {
            this.insertObject( object );
        });
    }

    public insertObject( s3object: S3StorageObject ): void
    {
        this.root.addChild( s3object );
    }

}