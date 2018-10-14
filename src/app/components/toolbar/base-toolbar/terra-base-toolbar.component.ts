import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector:    'terra-base-toolbar',
    styleUrls:   [
        './terra-base-toolbar.component.scss',
        './terra-base-toolbar.component.glob.scss'
    ],
    templateUrl: './terra-base-toolbar.component.html'
})
export class TerraBaseToolbarComponent
{
    @Input()
    public inputIsBreadcrumbs:boolean;

    constructor()
    {
        this.inputIsBreadcrumbs = false;
    }
}
