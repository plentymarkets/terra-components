import {
    Component,
    Input
} from '@angular/core';

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
    public inputType:string;

    constructor()
    {
        this.inputType = 'default';
    }
}
