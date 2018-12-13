import {
    Component,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector:      'terra-app-root',
    template:      require('./terra-components.component.html'),
    styles:        [require('./terra-components.component.scss')],
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
