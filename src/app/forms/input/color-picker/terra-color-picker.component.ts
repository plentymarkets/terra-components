import {
    Component,
    forwardRef
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TerraInputComponent } from "../terra-input.component";
import { TerraRegex } from "../../../regex/terra-regex";
import { Color } from "./color.helper";

@Component({
    selector:  'terra-color-picker',
    styles:    [require('./terra-color-picker.component.scss')],
    template:  require('./terra-color-picker.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraColorPickerComponent),
            multi:       true
        }
    ]
})
export class TerraColorPickerComponent extends TerraInputComponent
{
    constructor()
    {
        super(TerraRegex.COLOR_HEX);
    }

    public get color():string
    {
        return this.value || "#ffffff";
    }

    public set color(c:string)
    {
        this.value = c;
    }

    public isDark():boolean
    {
        return new Color(this.color).isDark();
    }
}
