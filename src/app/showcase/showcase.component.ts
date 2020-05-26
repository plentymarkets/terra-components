import {
    Component,
    Type
} from '@angular/core';
import { TerraComponentsExamplesModule } from '@plentymarkets/terra-components';

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
    public readonly examples:Array<Type<any>> = TerraComponentsExamplesModule.prototype.constructor['decorators'][0].args[0].exports;
}
