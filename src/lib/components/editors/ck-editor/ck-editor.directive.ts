import { Directive } from '@angular/core';
import { CKEditorComponent } from 'ckeditor4-angular';

@Directive({
  selector: '[tcCkEditor]'
})
export class CKEditorDirective {
  constructor(private _ckEditor: CKEditorComponent) {
    _ckEditor.editorUrl = 'https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js';
  }
}
