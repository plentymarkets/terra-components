import { Component } from '@angular/core';
import { terraFrontendStorageServiceStub } from '../../../testing/file-input/terra-frontend-storage-service-stub';
import { TerraFrontendStorageService } from '../terra-frontend-storage.service';

@Component({
    selector: 'terra-file-browser-example',
    styleUrls: [ './terra-file-browser.component.example.scss'],
    templateUrl: './terra-file-browser.component.example.html',
    providers: [{
        provide: TerraFrontendStorageService,
        useValue: terraFrontendStorageServiceStub
    }]
})
export class TerraFileBrowserComponentExample
{}
