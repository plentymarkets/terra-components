import {
    forwardRef,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { TerraFileListComponent } from './file-list.component';
import { TerraComponentsModule } from '../../terra-components.module';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:      [
        CommonModule,
        forwardRef(() => TerraComponentsModule.forRoot()),
        TranslationModule,
        FormsModule
    ],
    declarations: [
        TerraFileListComponent
    ]
})
export class TerraFileListModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  TerraFileListModule,
            providers: []
        };
    }

    static getMainComponent():string
    {
        return 'TerraFileListComponent';
    }
}