import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import {
    FormControl,
    Validators
} from '@angular/forms';

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
    protected animals:Array<string> = [
        'Dog',
        'Cat',
        'Cow',
        'Fox'
    ];
    protected selected:any = this.animals[1];

    protected selectFormControl:FormControl = new FormControl('valid', [
        Validators.required,
        Validators.pattern('valid'),
    ]);
    // protected matcher = new MyErrorStateMatcher();
}
