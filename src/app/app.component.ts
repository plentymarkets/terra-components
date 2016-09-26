import {
    Component,
    OnInit,
ViewChild,
ViewContainerRef

} from '@angular/core';
import { PlentyOverlay } from './overlay/plenty-overlay.component';

@Component({
               selector: 'app-root',
               template: require('./app.component.html'),
               styles:   [require('./app.component.scss')],
           })

export class AppComponent implements OnInit
{

    @ViewChild('overlayStatic') public overlayStatic:PlentyOverlay;

    private viewContainerRef: ViewContainerRef;

    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

    ngOnInit()
    {
    }

    private openOverlayStatic():void
    {
        this.overlayStatic.showOverlay();
    }
}
