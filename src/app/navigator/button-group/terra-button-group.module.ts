import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerraButtonGroupComponent } from './terra-button-group.component';
import { TooltipModule } from 'ngx-bootstrap';
import { TranslationModule } from 'angular-l10n';

@NgModule({
              imports:      [
                  CommonModule,
                  TooltipModule.forRoot(),
                  TranslationModule.forChild()
              ],
              declarations: [
                  TerraButtonGroupComponent
              ]
          })
export class TerraButtonGroupModule
{
    static forRoot()
    {
        return {
            ngModule:  TerraButtonGroupModule,
            providers: []
        };
    }
}
