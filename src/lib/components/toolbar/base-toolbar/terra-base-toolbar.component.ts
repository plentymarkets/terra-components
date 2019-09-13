import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector:    'terra-base-toolbar',
    styleUrls:   ['./terra-base-toolbar.component.scss'],
    templateUrl: './terra-base-toolbar.component.html'
})
export class TerraBaseToolbarComponent
{
    /**
     * @deprecated since v4. Breadcrumbs have its own styles now.
     */
    @Input()
    public inputIsBreadcrumbs:boolean;

    constructor()
    {
        this.inputIsBreadcrumbs = false;
    }
}
