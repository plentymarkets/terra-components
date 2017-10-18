import {
    ModuleWithProviders,
    NgModule
} from '@angular/core';
//import { TerraComponentsModule } from '../../terra-components.module';
import { TerraImageEditorComponent } from './image-editor.component';

@NgModule({
              imports: [
                  //TerraComponentsModule.forRoot()
              ],
              declarations: [
                  TerraImageEditorComponent
              ]
          })
export class TerraImageEditorModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: TerraImageEditorModule,
            providers: []
        };
    }

    static getMainComponent(): string
    {
        return 'TerraImageEditorComponent';
    }
}