import {
    Component,
    Input
} from '@angular/core';
import { TerraStorageObject } from '../model/terra-storage-object';

@Component({
    selector: 'terra-image-preview',
    template: require('./image-preview.component.html'),
    styles: [require('./image-preview.component.scss')]
})
export class TerraImagePreviewComponent
{
    @Input()
    public inputStorageObject: TerraStorageObject;
}