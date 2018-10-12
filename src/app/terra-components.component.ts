import {
    Component,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector:    'terra-app-root',
    templateUrl: './terra-components.component.html',
    styleUrls:   ['./terra-components.component.scss']
})
export class TerraComponentsComponent
{
    private viewContainerRef:ViewContainerRef;

    constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
