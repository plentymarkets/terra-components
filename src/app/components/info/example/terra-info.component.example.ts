import { Component } from '@angular/core';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-info-example',
    styles:   [require('./terra-info.component.example.scss')],
    template: require('./terra-info.component.example.html'),
})
export class TerraInfoComponentExample
{
    protected tooltipPlacement:TerraPlacementEnum = TerraPlacementEnum.RIGHT;
}
