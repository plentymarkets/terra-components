import {
    Component,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'terra-app-root',
    template: require('./terra-components.component.html'),
    styles:   [require('./terra-components.component.scss')]
})
export class TerraComponentsComponent
{
    private _viewContainerRef:ViewContainerRef;

    constructor(private viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }
}
