import { Component, ViewChild } from "@angular/core";
import { TerraOverlayComponent } from "../../../overlay/terra-overlay.component";

@Component({
    selector: 'terra-file-input',
    template: require('./terra-file-input.component.html'),
    styles: [require('./terra-file-input.component.scss')]
})
export class TerraFileInputComponent
{
    @ViewChild('overlay')
    public overlay: TerraOverlayComponent;

    public showFileBrowser()
    {
        this.overlay.showOverlay();
    }
}