import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector:    'terra-indicator',
    styleUrls:   ['./terra-indicator.component.scss'],
    templateUrl: './terra-indicator.component.html'
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
