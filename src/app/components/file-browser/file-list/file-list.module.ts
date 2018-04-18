import {
    forwardRef,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { TerraFileListComponent } from './file-list.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { TerraComponentsModule } from '../../../terra-components.module';

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
    public static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  TerraFileListModule,
            providers: []
        };
    }

    public static getMainComponent():string
    {
        return 'TerraFileListComponent';
    }
}
