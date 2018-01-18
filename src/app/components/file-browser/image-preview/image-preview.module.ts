import {
    forwardRef,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { TerraImagePreviewComponent } from './image-preview.component';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from 'angular-l10n';
import { CommonModule } from '@angular/common';
import { TerraComponentsModule } from '../../../terra-components.module';

@NgModule({
    imports:      [
        CommonModule,
        forwardRef(() => TerraComponentsModule.forRoot()),
        TranslationModule,
        FormsModule
    ],
    declarations: [
        TerraImagePreviewComponent
    ]
})
export class TerraImagePreviewModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  TerraImagePreviewModule,
            providers: []
        };
    }

    static getMainComponent():string
    {
        return 'TerraImagePreviewComponent';
    }
}