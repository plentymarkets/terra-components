import { Component, Input, OnInit } from '@angular/core';
import { TerraPlacementEnum } from '../../../../../helpers';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';
import { merge, noop, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { SuggestionInterface } from './suggestion.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

/** A type guard to check whether the given value is of type {@link TerraSuggestionBoxValueInterface}. */
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

    /** A list of options that the user can select from the suggestion box. */
    @Input()
    public listBoxValues: Array<TerraSuggestionBoxValueInterface> = [];

    /** A formControl for the handling of the value. */
    public _control: FormControl = new FormControl();
    /** An observable list of suggestions. The list will be updated whenever the user types in the input. */
    public _filteredOptions: Observable<Array<TerraSuggestionBoxValueInterface>>;

    public _autoCompleteOpened: Subject<void> = new Subject();

    /** Stores the callback function that will be called on blur. */
    public _onTouchedCallback: () => void = noop;
    /** Stores the callback function that will be called when the control's value changes in the UI. */
    public _onChangeCallback: (_: any) => void = noop;

    /** Formats the value to be displayed. */
    public _displayFn: (value: TerraSuggestionBoxValueInterface) => string = (
        value: TerraSuggestionBoxValueInterface
    ) => value?.caption;

    public ngOnInit(): void {
        const filteredOptions$: Observable<Array<TerraSuggestionBoxValueInterface>> = this._control.valueChanges.pipe(
            startWith(this._control.value ?? ''),
            map((value: TerraSuggestionBoxValueInterface | string) =>
                isSuggestionValue(value) ? value.caption : value
            ),
            map((caption: string) => this._filter(caption))
        );

        this._filteredOptions = merge(
            filteredOptions$,
            this._autoCompleteOpened.pipe(map(() => this.listBoxValues.slice()))
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

    /** Calls the onChangeCallback whenever the user selects a new option. */
    public _optionSelected(event: MatAutocompleteSelectedEvent): void {
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
