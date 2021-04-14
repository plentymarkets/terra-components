import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { TerraSelectBoxValueInterface } from '../../../select-box/data/terra-select-box.interface';
import { StringHelper } from '../../../../../helpers/string.helper';
import { TerraPlacementEnum } from '../../../../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'tc-select-box',
    templateUrl: './select-box.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectBoxComponent,
            multi: true
        }
    ]
})
export class SelectBoxComponent implements OnInit {
    /** @description The name of the select box also used to set the label. */
    @Input()
    public name: string = ' ';

    @Input()
    public isRequired: boolean;

    @Input()
    public isDisabled: boolean;

    @Input()
    public tooltipText: string;

    /** @description Set the tooltip placement (bottom, top, left, right). Default bottom. */
    @Input()
    public tooltipPlacement: TerraPlacementEnum = TerraPlacementEnum.BOTTOM;

    @Input()
    public selectBoxValues: Array<TerraSelectBoxValueInterface>; // TODO SelectInterface

    public _hasLabel: boolean;
    public _value: number | string;

    /**
     *
     * Two way data binding by ngModel
     */
    public _onTouchedCallback: () => void = noop;
    public _onChangeCallback: (_: any) => void = noop;

    public ngOnInit(): void {
        this._hasLabel = !StringHelper.isNullUndefinedOrEmpty(this.name);
    }

    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    /** @description Registers a callback function that is called by the forms API on initialization to update the form model on blur. */
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: any): void {
        this._value = value;
    }
}
