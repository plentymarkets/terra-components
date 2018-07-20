import {
    Component,
    Input
} from '@angular/core';

export enum TerraIndicatorLabelTypeEnum
{
    default = 'default',
    primary = 'primary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
}

export interface TerraIndicatorInterface
{
    label:string;
    type:TerraIndicatorLabelTypeEnum;
}

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
}
