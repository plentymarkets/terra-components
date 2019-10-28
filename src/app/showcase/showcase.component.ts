import {
    Component,
    Type
} from '@angular/core';
import { examples } from '../../lib/components/example-collection';
import { FormControl } from '@angular/forms';

/**
 * @description This component showcases all the examples provided by the TerraComponents library.
 */
@Component({
    selector:    'tc-showcase',
    templateUrl: './showcase.component.html',
    styleUrls:   ['./showcase.component.scss']
})
export class ShowcaseComponent
{
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());

    protected readonly examples:Array<Type<any>> = examples;
}
