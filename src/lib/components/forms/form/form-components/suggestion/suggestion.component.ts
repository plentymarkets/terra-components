import { Component, Input, OnInit } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { noop, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { SuggestionInterface } from './suggestion.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export function isSuggestionValue(value: unknown): value is TerraSuggestionBoxValueInterface {
    return typeof value === 'object' && 'caption' in value && 'value' in value;
}

@Component({
    selector: 'tc-suggestion',
    templateUrl: './suggestion.component.html'
})
export class SuggestionComponent implements ControlValueAccessor, SuggestionInterface, OnInit {
    /** Set the label. */
    @Input()
    public name: string = '';

    /** If true, a * indicates that the value is required. Default false. */
    @Input()
    public isRequired: boolean = false;

    /** If true, the autocomplete-input will be disabled. Default false. */
    @Input()
    public isDisabled: boolean = false;

    /** Set the tooltip. */
    @Input()
    public tooltipText: string = '';

    /** Set the tooltip placement (bottom, top, left, right). Default top. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.TOP;

    @Input()
    public listBoxValues: Array<TerraSuggestionBoxValueInterface> = [];

    /** Internal model. Stores the value of the selected option. */
    public _control: FormControl = new FormControl();
    /** An observable of an array to map the filtered values. */
    public _filteredOptions: Observable<Array<TerraSuggestionBoxValueInterface>>;

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    public _displayFn: (value: TerraSuggestionBoxValueInterface) => string = (
        value: TerraSuggestionBoxValueInterface
    ) => value?.caption;

    public ngOnInit(): void {
        this._filteredOptions = this._control.valueChanges.pipe(
            startWith(this._control.value ?? ''),
            map((value: TerraSuggestionBoxValueInterface | string) =>
                isSuggestionValue(value) ? value.caption : value
            ),
            map((caption: string) => this._filter(caption))
        );
    }

    /** Registers a callback function that is called when the control's value changes in the UI. */
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /** Writes a new value to the input element. */
    public writeValue(value: any): void {
        const selectedValue: TerraSuggestionBoxValueInterface | undefined = this.listBoxValues.find(
            (v: TerraSuggestionBoxValueInterface) => v.value === value
        );
        this._control.setValue(selectedValue);
    }

    public optionSelected(event: MatAutocompleteSelectedEvent): void {
        const selectedValue: TerraSuggestionBoxValueInterface = event.option.value;
        this._onChangeCallback(selectedValue.value);
    }

    /** A function to filter through the listBoxValues depending on the value in the autocomplete-input. */
    private _filter(value: string): Array<TerraSuggestionBoxValueInterface> {
        const filterValue: string = value.toLowerCase();

        return this.listBoxValues.filter((option: TerraSuggestionBoxValueInterface) =>
            option.caption.toLowerCase().includes(filterValue)
        );
    }
}
