import { Observable, of } from 'rxjs';
import { fileData } from './file-data';
import { TerraFrontendStorageService } from '../../components/file-browser/terra-frontend-storage.service';
import { TerraStorageObjectList } from '../../components/file-browser/model/terra-storage-object-list';
import { TerraUploadQueue } from '../../components/file-browser/model/terra-upload-queue';

export const terraFrontendStorageServiceStub: Partial<TerraFrontendStorageService> = {
  getStorageList: (): Observable<TerraStorageObjectList> => {
    return of(new TerraStorageObjectList().insertObjects(fileData.objects));
  },
  queue: new TerraUploadQueue('/rest/storage/frontend/file')
};
