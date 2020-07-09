import { Component } from '@angular/core';
import { terraFrontendStorageServiceStub } from '../../../../../testing/file-input/terra-frontend-storage-service-stub';
import { TerraFrontendStorageService } from '../../../../../components/file-browser/terra-frontend-storage.service';

@Component({
    selector: 'terra-file-input-example',
    styleUrls: [ './terra-file-input.component.example.scss'],
    templateUrl: './terra-file-input.component.example.html',
    providers: [{
        provide: TerraFrontendStorageService,
        useValue: terraFrontendStorageServiceStub
    }]
})
export class TerraFileInputComponentExample
{
}
