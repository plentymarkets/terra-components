import {
    Component,
    Type,
    ViewEncapsulation
} from '@angular/core';
import { examples } from '../lib/components/example-collection';

@Component({
    selector:      'terra-app-root',
    template:      require('./app.component.html'),
    styles:        [require('./app.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    protected readonly examples:Array<Type<any>> = examples;
}
