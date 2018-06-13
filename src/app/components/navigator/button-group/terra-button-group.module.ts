import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraButtonGroupComponent } from './terra-button-group.component';
import { TooltipModule } from 'ngx-bootstrap';
import { TranslationModule } from 'angular-l10n';

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
