import { Component } from '@angular/core';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-info-example',
    styleUrls: [ './terra-info.component.example.scss'],
    templateUrl: './terra-info.component.example.html',
})
export class TerraInfoComponentExample
{
    public _tooltipPlacement:TerraPlacementEnum = TerraPlacementEnum.RIGHT;
}
