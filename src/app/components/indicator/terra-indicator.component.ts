import {
    Component,
    Input
} from '@angular/core';

export enum TerraIndicatorLabelType
{
    DEFAULT = 'default',
    PRIMARY = 'primary',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

@Component({
    selector: 'terra-indicator',
    styles:   [require('./terra-indicator.component.scss')],
    template: require('./terra-indicator.component.html')
})
export class TerraIndicatorComponent
{
    @Input() inputLabel:string;
    @Input() inputType:string;

    constructor()
    {
        this.inputType = TerraIndicatorLabelType.DEFAULT;
    }
}
