import {
    ModuleWithProviders,
    NgModule
} from '@angular/core';
//import { TerraComponentsModule } from '../../terra-components.module';
import { TerraImagePreviewComponent } from './image-preview.component';

@NgModule({
  imports: [
      //TerraComponentsModule.forRoot()
  ],
  declarations: [
      TerraImagePreviewComponent
  ]
})
export class TerraImagePreviewModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: TerraImagePreviewModule,
            providers: []
        };
    }

    static getMainComponent(): string
    {
        return 'TerraImagePreviewComponent';
    }
}