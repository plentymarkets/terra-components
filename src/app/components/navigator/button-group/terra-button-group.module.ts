import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraButtonGroupComponent } from './terra-button-group.component';
import { TooltipModule } from 'ngx-bootstrap';
import { TranslationModule } from 'angular-l10n';

/**
 * @deprecated since `terra-button-group.component` is now deprecated
 */
@NgModule({
    imports:      [
        CommonModule,
        TooltipModule.forRoot(),
        TranslationModule
    ],
    declarations: [
        TerraButtonGroupComponent
    ]
})
export class TerraButtonGroupModule
{
    public static forRoot():Object
    {
        return {
            ngModule:  TerraButtonGroupModule,
            providers: []
        };
    }
}
