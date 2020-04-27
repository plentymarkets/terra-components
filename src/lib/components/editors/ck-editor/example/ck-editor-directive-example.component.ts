import { Component, ViewChild } from '@angular/core';
import { ckEditorMinimumConfig } from '../presets/ck-editor-minimum-preset';
import { ckEditorFullConfig } from '../presets/ck-editor-full-preset';
import { CKEditorComponent } from 'ckeditor4-angular';

@Component({
  selector: 'tc-ck-editor-directive-example',
  templateUrl: './ck-editor-directive-example.component.html'
})
export class CkEditorDirectiveExample {
  @ViewChild('ckFull', { static: true })
  public ckFull: CKEditorComponent;

  public _config: {} = ckEditorFullConfig;
  public _tiny: {} = ckEditorMinimumConfig;

  public saveCkFull(): void {
    // This is needed because the data binding while in source mode do not work as expected
    if (this.ckFull.instance.mode === 'source') {
      // commandId 'source' triggers a toggle to switch between source and wysiwyg mode
      this.ckFull.instance.execCommand('source');
    }

    // Do save stuff here
  }
}
