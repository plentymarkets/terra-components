import {
    Component,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector:      'terra-app-root',
    templateUrl:   './terra-components.component.html',
    styleUrls:     ['./terra-components.component.scss',
                    '../index.glob.scss',
                    '../app/assets/styles/icons.glob.scss'],
    encapsulation: ViewEncapsulation.None
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
