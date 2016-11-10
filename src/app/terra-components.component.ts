import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TerraOverlayComponent } from './overlay/terra-overlay.component';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss').toString()],
           })
export class TerraComponentsComponent implements OnInit
{
    @ViewChild('viewChildOverlayStatic') viewChildOverlayStatic:TerraOverlayComponent;
    
    private _viewContainerRef:ViewContainerRef;
    
    public constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }
    
    ngOnInit()
    {
    }
    
    private openOverlayStatic():void
    {
        this.viewChildOverlayStatic.showOverlay();
    }
}
