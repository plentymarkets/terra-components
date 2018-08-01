import {
    Component,
    Input
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'terra-base-toolbar',
    styles:   [
        require('./terra-base-toolbar.component.scss'),
        require('./terra-base-toolbar.component.glob.scss').toString()
    ],
    template: require('./terra-base-toolbar.component.html')
})
export class TerraBaseToolbarComponent
{
    @Input()
    public inputIsBreadcrumbs:boolean;

    constructor(private deviceDetectorService:DeviceDetectorService)
    {
        this.inputIsBreadcrumbs = false;
    }

    protected checkBrowser():boolean
    {
        return this.inputIsBreadcrumbs &&
               (this.deviceDetectorService.isMobile() ||
                this.deviceDetectorService.isTablet());
    }
}
