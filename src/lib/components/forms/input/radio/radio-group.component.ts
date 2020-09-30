import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StringHelper } from '../../../../helpers/string.helper';
import { noop } from 'rxjs';

let nextId: number = 0;

/**
 * @author pweyrich
 */
@Component({
    selector: 'tc-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioGroupComponent,
            multi: true
        }
    ]
})
export class RadioGroupComponent implements ControlValueAccessor, OnInit, OnChanges {
    /**
     * Name of the group. This is projected to the input's name property.
     */
    @Input()
    public name: string;

    /**
     * Content of the <legend>-Element. Usually a string.
     */
    @Input()
    public legend: string;

    @Input()
    public inline: boolean = false;

    private _value: unknown;
    private readonly _id: string;

    private touchedCallback: () => void = noop;
    private changeCallback: (_: unknown) => void = noop;

    constructor() {
        this._id = `radio-group#${nextId++}`;
    }

    /**
     * Implementation of the OnInit life cycle hook
     * @description Provides a generated id as default name if no name is given via the input.
     */
    public ngOnInit(): void {
        if (StringHelper.isNullUndefinedOrEmpty(this.name)) {
            this.name = this._id;
        }
    }

    /**
     * Implementation of the OnChanges life cycle hook
     * @description Ensures that the name property is defined by using a generated id as a fallback value if no name is given.
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('name') && StringHelper.isNullUndefinedOrEmpty(changes['name'].currentValue)) {
            this.name = this._id;
        }
    }

    /**
     * set the value of the radio group and update model binding by executing a registered #changeCallback
     * @param value
     */
    public set value(value: unknown) {
        this._value = value;
        this.changeCallback(this._value);
    }

    /**
     * get the current value of the radio group
     */
    public get value(): unknown {
        return this._value;
    }

    /**
     * set the value of the radio group.
     * @param value
     */
    public writeValue(value: unknown): void {
        this._value = value;
    }

    /**
     * register a change callback which is executed when the #value of the radio group changes
     * @param fn
     */
    public registerOnChange(fn: (_: unknown) => void): void {
        this.changeCallback = fn;
    }

    /**
     * register a touched callback which is executed when one of the given radio inputs has been visited
     * TODO: To be implemented
     * @param fn
     */
    public registerOnTouched(fn: () => void): void {
        this.touchedCallback = fn;
    }
}
