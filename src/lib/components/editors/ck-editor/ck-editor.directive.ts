import {
    Directive,
    Host
} from '@angular/core';
import {
    CKEditor4,
    CKEditorComponent
} from 'ckeditor4-angular';

@Directive({
    selector: 'ckeditor[tcCkEditor]'
})
export class CKEditorDirective
{
    constructor(@Host() private _ckEditor:CKEditorComponent)
    {
        _ckEditor.editorUrl = 'https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js';
        _ckEditor.type = CKEditor4.EditorType.DIVAREA;
    }
}
