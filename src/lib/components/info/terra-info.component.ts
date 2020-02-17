import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector:    'terra-info',
    styleUrls:   ['./terra-info.component.scss'],
    templateUrl: './terra-info.component.html'
})
export class TerraInfoComponent
{
    @Input()
    public isDisabled:boolean;

    @Input()
    public text:string;
}
