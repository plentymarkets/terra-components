import {
    Component,
    Type,
    ViewEncapsulation
} from '@angular/core';
import { examples } from './components/example-collection';

@Component({
    selector:      'terra-app-root',
    template:      require('./terra-components.component.html'),
    styles:        [require('./terra-components.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class TerraComponentsComponent
{
    protected readonly examples:Array<Type<unknown>> = examples;
}
