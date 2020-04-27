import { TerraBaseStorageService } from './terra-base-storage.interface';

export abstract class TerraBasePrivateStorageService extends TerraBaseStorageService {
  public abstract downloadFile(key: string): void;
}
