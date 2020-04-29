import { Component, Type } from '@angular/core';
import { examples } from '../../lib/components/example-collection';

/**
 * @description This component showcases all the examples provided by the TerraComponents library.
 */
@Component({
    selector: 'tc-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent {
    public readonly examples: Array<Type<any>> = examples;
}
