import {
    Component,
    ViewEncapsulation
} from '@angular/core';

export interface Food
{
    value:number;
    viewValue:string;
}

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
{
    foods:Food[] = [
        {
            value:     99,
            viewValue: 'Steak'
        },
        {
            value:     22,
            viewValue: 'Pizza'
        },
        {
            value:     1,
            viewValue: 'ziyad'
        },
        {
            value:     4,
            viewValue: 'Tacos'
        }
    ];
}
