import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { Time } from '@angular/common';

/**
 * @description This is a sandbox app which can be used to test out functionality from the TerraComponents library.
 * By default, it displays all the examples provided by the library.
 *
 * NOTE: This app is not compiled when running `npm run build`. Hence, it will also not be published.
 */
@Component({
    selector:      'tc-sandbox-app',
    templateUrl:   './app.component.html',
    styleUrls:     ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    public time:Time;

    constructor()
    {
        const now:Date = new Date();
        this.time = {
            hours: now.getHours(),
            minutes: now.getMinutes()
        };
    }
}
