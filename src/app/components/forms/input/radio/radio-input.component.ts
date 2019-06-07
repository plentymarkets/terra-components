import {
    Component,
    Host,
    Input
} from '@angular/core';
import { RadioGroupComponent } from './radio-group.component';

let nextId:number = 0;

/**
 * @author pweyrich
 * @description This component is a wrapper for HTML5's native <input [type="radio"]> element including a corresponding <label> element.
 * It must be used within a hosting <tc-radio-group> element!
 */
@Component({
    selector: 'tc-radio-input',
    templateUrl: './radio-input.component.html',
    styleUrls: [ './radio-input.component.scss'],
})
export class RadioInputComponent
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

    /**
     * unique identifier of this input instance
     */
    protected readonly id:string;

    constructor(@Host() protected group:RadioGroupComponent)
    {
        // generate the id of the input instance
        this.id = `radio-input#${nextId++}`;
    }
}
