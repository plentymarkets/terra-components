import { EventEmitter } from '@angular/core';
import { TerraStorageObject } from './model/terra-storage-object';
import { TerraBaseStorageService } from './terra-base-storage.interface';

/** Interface that acts as a lightweight injection token for the {@link TerraFileBrowserComponent}. */
export abstract class TerraFileBrowser {
    public abstract inputAllowedExtensions: Array<string>;
    public abstract inputAllowFolders: boolean;
    public abstract onSelectedUrlChange: EventEmitter<string>;
    public abstract outputSelectedChange: EventEmitter<TerraStorageObject>;
    public abstract updatedStorageRootAndService: EventEmitter<[TerraBaseStorageService, TerraStorageObject]>;
}
