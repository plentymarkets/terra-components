import { Directive } from '@angular/core';
import { CKEditorComponent } from 'ckeditor4-angular';

@Directive({
    selector: '[tcCkFull]'
})
export class CKEditorFullDirective
{
    constructor(private ckEditor:CKEditorComponent)
    {
        ckEditor.editorUrl = 'https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js';
    }
}
