import {
    Component,
    ViewEncapsulation
} from '@angular/core';

/**
 * @description This is a sandbox app which can be used to test out functionality from the TerraComponents library.
 * By default, it displays all the examples provided by the library.
 *
 * NOTE: This app is not compiled when running `npm run build`. Hence, it will also not be published.
 */
@Component({
    selector:      'tc-sandbox-app',
    template:      require('./app.component.html'),
    styles:        [require('./app.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{}
