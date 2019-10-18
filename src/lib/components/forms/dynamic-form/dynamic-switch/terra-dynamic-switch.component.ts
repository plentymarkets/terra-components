import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TerraFormFieldBase } from '../data/terra-form-field-base';
import { TerraControlTypeEnum } from '../enum/terra-control-type.enum';
import { Language } from 'angular-l10n';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
@Component({
    selector: 'terra-dynamic-switch',
    template: require('./terra-dynamic-switch.component.html'),
    styles:   [require('./terra-dynamic-switch.component.scss')]
})
export class TerraDynamicSwitchComponent implements OnInit, OnDestroy
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

    @Language()
    protected lang:string;

    // Necessary for using enum in html
    protected controlTypeEnum:any = TerraControlTypeEnum;

    @Input()
    private inputShowDeprecatedConfig:boolean;

    constructor()
    {
        this.inputSubSwitch = false;
    }

    public ngOnInit():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnDestroy():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }
}
