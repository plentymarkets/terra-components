import {
    Component,
    Type
} from '@angular/core';
import { examples } from '../../lib/components/example-collection';

@Component({
    selector:    'tc-showcase',
    templateUrl: './showcase.component.html',
    styleUrls:   ['./showcase.component.scss']
})
export class ShowcaseComponent
{
    protected readonly examples:Array<Type<any>> = examples;
}
