import { TerraImageMetadata } from './model/terra-image-metadata.interface';
import { Observable } from 'rxjs';
import { TerraBaseStorageService } from './terra-base-storage.interface';

export abstract class TerraBaseMetadataStorageService extends TerraBaseStorageService {
    public abstract getMetadata(key: string): Observable<TerraImageMetadata>;

    public abstract updateMetadata(key: string, metadata: TerraImageMetadata): Observable<any>;
}
