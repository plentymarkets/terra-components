import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraInputComponent } from '../terra-input.component';
import { Color } from '../../../../helpers/color.helper';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';

/** @deprecated since v5. Please use mat-input of type color instead. */
@Component({
    selector: 'terra-color-picker',
    styleUrls: ['./terra-color-picker.component.scss'],
    templateUrl: './terra-color-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraColorPickerComponent,
            multi: true
        }
    ]
})
export class TerraColorPickerComponent extends TerraInputComponent {
    constructor() {
        super(TerraRegex.COLOR_HEX);
    }

    public get color(): string {
        return this.value || '#ffffff';
    }

    public set color(c: string) {
        this.value = c;
    }

    public isDark(): boolean {
        return new Color(this.color).isDark();
    }
}
