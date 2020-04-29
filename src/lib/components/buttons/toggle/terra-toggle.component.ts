import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import { noop } from 'rxjs';

@Component({
    selector: 'terra-toggle',
    styleUrls: ['./terra-toggle.component.scss'],
    templateUrl: './terra-toggle.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraToggleComponent,
            multi: true
        }
    ]
})
export class TerraToggleComponent implements ControlValueAccessor {
    @Input()
    public inputIsSmall: boolean;

    @Input()
    public inputIsLarge: boolean;

    @Input()
    public inputIsDisabled: boolean;

    @Input()
    public inputIcon: string;

    @Input()
    public inputIsAlignRight: boolean;

    @Input()
    public inputIsHidden: boolean;

    @Input()
    public inputTooltipText: string;

    /**
     * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
     */
    @Input()
    public inputTooltipPlacement: TerraPlacementEnum;

    @Output()
    public deactivated: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public activated: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

    public _isActive: boolean = false;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor() {
        this.inputTooltipPlacement = TerraPlacementEnum.TOP;
    }

    // From ControlValueAccessor interface
    public writeValue(value: boolean): void {
        if (value !== this._isActive) {
            this._isActive = value;
        }
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: (_: any) => void): void {
        this._onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    public _toggle(): void {
        if (!this.inputIsDisabled) {
            this._isActive = !this._isActive;
            this.toggled.emit(this._isActive);
            this._onChangeCallback(this._isActive);
            if (this._isActive) {
                this.activated.emit();
            } else {
                this.deactivated.emit();
            }
        }
    }
}
