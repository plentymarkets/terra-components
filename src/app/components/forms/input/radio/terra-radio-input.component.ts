import {
    Component,
    Host,
    Input
} from '@angular/core';
import { TerraRadioGroupComponent } from './terra-radio-group.component';

/**
 * @author pweyrich
 * @description This component is a wrapper for HTML5's native <input [type="radio"]> element including a corresponding <label> element.
 * It must be used within a hosting <terra-radio-group> element!
 */
@Component({
    selector:  'terra-radio-input',
    template:  require('./terra-radio-input.component.html'),
    styles:    [require('./terra-radio-input.component.scss')],
})
export class TerraRadioInputComponent
{
    /**
     * The radio input's label
     */
    @Input()
    public label:string;

    /**
     * The value related to this radio input
     */
    @Input()
    public value:any;

    /**
     * The input is disabled if set to true
     * @default false
     */
    @Input()
    public disabled:boolean = false;

    constructor(@Host() protected group:TerraRadioGroupComponent)
    {}
}
