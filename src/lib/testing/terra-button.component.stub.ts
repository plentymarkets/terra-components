import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { TerraButtonComponent } from '../components/buttons/button/terra-button.component';

@Component({selector: 'terra-button', template: ''})
/* tslint:disable-next-line:component-class-suffix */
export class TerraButtonComponentStub implements Partial<TerraButtonComponent> {
    @Input() public inputIcon:string;
    @Input() public inputIsDisabled:boolean;
    @Output() public outputClicked:EventEmitter<Event> = new EventEmitter();
}
