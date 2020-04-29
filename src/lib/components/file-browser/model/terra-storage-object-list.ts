import { TerraStorageObject } from './terra-storage-object';
import { createS3StorageObject, S3StorageObjectInterface } from './s3-storage-object.interface';

export class TerraStorageObjectList {
    public root: TerraStorageObject;

    constructor() {
        this.root = new TerraStorageObject(createS3StorageObject('/'));
    }

    public insertObjects(objects: Array<S3StorageObjectInterface>): TerraStorageObjectList {
        objects.forEach((object: S3StorageObjectInterface) => {
            this.insertObject(object);
        });
        return this;
    }

    public insertObject(s3object: S3StorageObjectInterface): TerraStorageObjectList {
        this.root.addChild(s3object);
        return this;
    }

    public get flatList(): Array<TerraStorageObject> {
        return this.appendChildren(this.root);
    }

    private appendChildren(object: TerraStorageObject): Array<TerraStorageObject> {
        let result: Array<TerraStorageObject> = [object];

        object.children.forEach((child: TerraStorageObject) => {
            result.concat(this.appendChildren(child));
        });

        return result;
    }
}
