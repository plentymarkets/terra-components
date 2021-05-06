import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { noop } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'tc-suggestion',
    templateUrl: './suggestion.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SuggestionComponent,
            multi: true
        }
    ]
})
export class SuggestionComponent {
    @Input()
    public name: string = '';

    @Input()
    public isRequired: boolean = false;

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public tooltipText: string = '';

    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    @Input()
    public listBoxValues: Array<TerraSuggestionBoxValueInterface> = [];

    /** @description Stores a callback function which is executed whenever the select was blurred. */
    public _onTouchedCallback: () => void = noop;

    /** @description Stores a callback function which is executed whenever the value of the select changes. */
    public _onChangeCallback: (_: any) => void = noop;

    /** @description Internal model. The value of the selectBox. */
    public value: any;

    /** @description Writes a new value to the element.*/
    public writeValue(value: any): void {
        this.value = value;
    }

    /** @description Registers a callback function that is called when the control's value changes in the UI.*/
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** @description Registers a callback function that is called by the forms API on initialization to update the form model on blur.*/
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }
}
