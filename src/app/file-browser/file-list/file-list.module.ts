import {
    forwardRef,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { TerraFileListComponent } from './file-list.component';
import { TerraComponentsModule } from '../../terra-components.module';

@NgModule({
    imports: [
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