import {
    Component,
    Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-dynamic-switch',
    template: require('./terra-dynamic-switch.component.html'),
    styles:   [require('./terra-dynamic-switch.component.scss')]
})
export class TerraDynamicSwitchComponent
{
    // Auf TerraFormFieldConditionalBean umbauen
    // private readonly DELAY_FOR_CHANGE_DETECTION:number = 1;

    @Input()
    public inputFormFields:Array<TerraFormFieldBase<any>>;

    @Input()
    public inputFormGroup:FormGroup;

    @Input()
    public inputSubSwitch:boolean;

    @Input()
    public inputIsDisabled:boolean;

    @Input()
    public inputPortletHeader:string;

    @Input()
    public inputUsePortlet:boolean;

    // Necessary for using enum in html
    protected controlTypeEnum:any = TerraControlTypeEnum;

    constructor()
    {
        this.inputSubSwitch = false;
    }
}
