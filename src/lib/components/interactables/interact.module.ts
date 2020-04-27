import { NgModule } from '@angular/core';
import { TerraDraggableDirective } from './draggable.directive';
import { TerraDropzoneDirective } from './dropzone.directive';
import { TerraResizableDirective } from './resizable.directive';

@NgModule({
  imports: [],
  declarations: [TerraDraggableDirective, TerraDropzoneDirective, TerraResizableDirective],
  exports: [TerraDraggableDirective, TerraDropzoneDirective, TerraResizableDirective]
})
export class TerraInteractModule {}
