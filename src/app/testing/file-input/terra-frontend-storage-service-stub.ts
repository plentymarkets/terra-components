import {
    TerraFrontendStorageService,
    TerraStorageObjectList,
    TerraUploadQueue
} from '../../..';
import { Observable } from 'rxjs';
import { fileData } from './file-data';

export const terraFrontendStorageServiceStub:Partial<TerraFrontendStorageService> = {
    getStorageList: ():Observable<TerraStorageObjectList> => { return Observable.of(new TerraStorageObjectList().insertObjects(fileData.objects)); },
    queue: new TerraUploadQueue('/rest/storage/frontend/file')
};
