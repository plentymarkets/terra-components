import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
@Component({
    selector: 'terra-dynamic-switch',
    templateUrl: './terra-dynamic-switch.component.html',
    styleUrls: ['./terra-dynamic-switch.component.scss']
})
export class TerraDynamicSwitchComponent {
    // Auf TerraFormFieldConditionalBean umbauen
    // private readonly DELAY_FOR_CHANGE_DETECTION:number = 1;

    @Input()
    public inputFormFields: Array<TerraFormFieldBase<any>>;

    @Input()
    public inputFormGroup: FormGroup;

    @Input()
    public inputSubSwitch: boolean;

    @Input()
    public inputIsDisabled: boolean;

    @Input()
    public inputPortletHeader: string;

    @Input()
    public inputUsePortlet: boolean;

    // Necessary for using enum in html
    public _controlTypeEnum: any = TerraControlTypeEnum;

    @Input()
    public inputShowDeprecatedConfig: boolean;

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {
        this.inputSubSwitch = false;
    }
}
