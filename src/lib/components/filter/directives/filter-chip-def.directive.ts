import { ContentChild, Directive, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FilterChipLabelDirective } from './filter-chip-label.directive';
import { DisplayWithFn } from '../models';
import { FilterContainerDirective } from './filter-container.directive';

/**
 * Definition for a single chip associated with a filter.
 *
 * @example
 * ```
 * <mat-form-field terraFilterChipDef>
 *     <mat-label terraFilterChipLabel>Title</mat-label>
 *     <input matInput type="text" ngModel name="title">
 * </mat-form-field>
 * ```
 */
// tslint:disable:no-input-rename
@Directive({
    selector: '[terraFilterChipDef]'
})
export class FilterChipDefDirective implements OnInit, OnDestroy {
    /** A function to customize the display of the filter's value on the chip. */
    @Input('terraFilterChipDisplayWith')
    public displayWith: DisplayWithFn;

    /** Whether to hide the filter's value on the chip. By default, the value is shown. */
    @Input('terraFilterChipHideValue')
    public get hideValue(): boolean {
        return this._hideValue;
    }
    public set hideValue(val: boolean) {
        this._hideValue = coerceBooleanProperty(val);
    }

    /** Queries the control associated to the filter if it is contained by the element that this directive is applied to. */
    @ContentChild(NgControl)
    public set control(control: NgControl) {
        this._control = control ?? this.ngControl;
    }
    /* tslint:disable-next-line:get-set */
    public get control(): NgControl {
        return this._control;
    }

    /** The text that will be displayed as a label on the chip. */
    public label: string;

    /** Holds the information whether to hide the filter's value on the chip. */
    private _hideValue: boolean;
    /** Reference to the control of a filter. */
    private _control: NgControl = this.ngControl;

    constructor(
        /** Reference to the parent filter container */
        private container: FilterContainerDirective,
        /** If this directive is used on the form control itself we access the form control via dependency injection. */
        @Optional() @Self() private ngControl: NgControl
    ) {}

    /** A chip must register itself in the container during initialization. */
    public ngOnInit(): void {
        this.container.addChipDef(this);
    }

    /** A chip must unregister itself from the container when it is destroyed. */
    public ngOnDestroy(): void {
        this.container.removeChipDef(this);
    }
}
