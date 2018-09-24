import {
    Component,
    Input,
} from '@angular/core';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-info',
    styles:   [require('./terra-info.component.scss')],
    template: require('./terra-info.component.html')
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
