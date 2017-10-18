import {
    forwardRef,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { TerraFileListComponent } from './file-list.component';
import { TerraComponentsModule } from '../../terra-components.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        forwardRef(() => TerraComponentsModule.forRoot())
    ],
    declarations: [
        TerraFileListComponent
    ]
})
export class TerraFileListModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: TerraFileListModule,
            providers: []
        };
    }

    static getMainComponent(): string
    {
        return 'TerraFileListComponent';
    }
}