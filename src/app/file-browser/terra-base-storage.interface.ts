import { TerraStorageObjectList } from './model/terra-storage-object-list';
import { TerraBaseService } from '../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraUploadItem } from './model/terra-upload-item';
import { TerraImageMetadata } from './model/terra-image-metadata.interface';
import { TerraUploadQueue } from './model/terra-upload-queue';

export abstract class TerraBaseStorageService extends TerraBaseService
{
    public abstract name:string;

    public abstract isPublic:boolean;

    public abstract queue:TerraUploadQueue;

    public abstract getStorageList():Observable<TerraStorageObjectList>;

    public abstract createDirectory(path:string):Observable<any>;

    public abstract uploadFiles(files:FileList | File[], path:string):TerraUploadItem[];

    public abstract deleteFiles(keys:string[]):Observable<any>;

    public prepareKey(value:string, isName:boolean = false, isDirectory:boolean = false):string
    {
        value = value
            .replace(/\s+/g, '_')                 // Replace whitespaces
            .replace(/ä/g, 'ae')                  // Replace special characters
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/Ä/g, 'Ae')
            .replace(/Ö/g, 'Oe')
            .replace(/Ü/g, 'Ue')
            .replace(/ß/g, 'ss')
            .replace(/[^A-Za-z0-9\-_\/.]/g, '_');     // Remove all remaining special characters

        if(isName)
        {
            // remove slashes in names to avoid creating subdirectories
            value = value.replace(/\//g, '_');
        }

        if(isDirectory)
        {
            value = value.replace(/\./g, '_');
        }

        return value;
    }
}

export abstract class TerraBaseMetadataStorageService extends TerraBaseStorageService
{
    public abstract getMetadata(key:string):Observable<TerraImageMetadata>;

    public abstract updateMetadata(key:string, metadata:TerraImageMetadata):Observable<any>;
}
