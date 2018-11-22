import {
    Component,
    Input
} from '@angular/core';
import { TerraIndicatorLabelTypeEnum } from '../../helpers/enums/indicator-label-type.enum';

@Component({
    selector: 'terra-indicator',
    styles:   [require('./terra-indicator.component.scss')],
    template: require('./terra-indicator.component.html')
})
export class TerraIndicatorComponent
{
    @Input()
    public inputLabel:string;

    @Input()
    public inputType:TerraIndicatorLabelTypeEnum;

    constructor()
    {
        this.inputType = TerraIndicatorLabelTypeEnum.default;
    }

    protected get indicator():string
    {
        return 'label-' + this.inputType;
    }
}
