import {
    AfterContentInit,
    Component,
    ViewEncapsulation
} from '@angular/core';

require('floatthead/src/jquery.floatThead.js');

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
export class AppComponent implements AfterContentInit
{
    public ngAfterContentInit():void
    {
        $('#ronny').css('height', '100px');
        $('#ronny').css('width', '100px');
        $('#ronny').css('background-color', 'black');

        $('.table.demo0').floatThead({
            position: 'fixed'
        });
    }
}
