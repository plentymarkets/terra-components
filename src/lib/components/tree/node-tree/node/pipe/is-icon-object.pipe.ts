import { Pipe, PipeTransform } from '@angular/core';
import { TerraRouteIcon } from '../../../../../types/terra-route-icon.type';

@Pipe({
    name: 'isIconObject'
})
export class IsIconObjectPipe implements PipeTransform {
    public transform(value: TerraRouteIcon): value is { fontSet: 'material-icons' | 'plentyicons'; fontIcon: string } {
        return typeof value === 'object';
    }
}
