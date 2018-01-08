import {
    Component,
    Input
} from '@angular/core';
import { TerraPlacementEnum } from './terra-placement.enum';

@Component({
    selector: 'terra-info',
    styles:   [require('./terra-info.component.scss')],
    template: require('./terra-info.component.html')
})
export class TerraInfoComponent
{
    @Input() inputTextPlacement:TerraPlacementEnum;
    @Input() inputIsDisabled:boolean;
    @Input() inputText:string;

    constructor()
    {
        this.inputTextPlacement = TerraPlacementEnum.LEFT;
    }
}
