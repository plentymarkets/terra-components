import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import {
    FormControl,
    Validators
} from '@angular/forms';

export interface Animal
{
    name:string;
    sound:string;
    icon?:string;
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
    public animalControl:FormControl = new FormControl('', [Validators.required]);
    public selectFormControl:FormControl = new FormControl('', Validators.required);
    public animals:Array<Animal> = [
        {
            name:  'Dog',
            sound: 'Woof!'
        },
        {
            name:  'Cat',
            sound: 'Meow!'
        },
        {
            name:  'Cow',
            sound: 'Moo!'
        },
        {
            name:  'Fox',
            sound: 'Wa-pa-pa-pa-pa-pa-pow!'
        },
    ];

    public selected;
}
