import {
    Component,
    Input
} from '@angular/core';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';

@Component({
    selector:    'terra-info',
    styleUrls:   ['./terra-info.component.scss'],
    templateUrl: './terra-info.component.html'
})
export class TerraInfoComponent
{
    @Input()
    public textPlacement:TerraPlacementEnum;

    @Input()
    public isDisabled:boolean;

    @Input()
    public text:string;

    constructor()
    {
        this.textPlacement = TerraPlacementEnum.TOP;
    }
}
