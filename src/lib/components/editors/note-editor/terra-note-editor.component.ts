import {
    Component,
    ElementRef
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';
import { quillNotePreset } from '../quill/presets';

/** @deprecated since v5. Use the quill-editor and our quillNotePreset instead. */
@Component({
    selector:    'terra-note-editor',
    templateUrl: './terra-note-editor.component.html',
    providers:   [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraNoteEditorComponent,
        multi:       true
    }]
})
export class TerraNoteEditorComponent extends TerraBaseEditorComponent
{
    constructor(translation:TranslationService,
                myElement:ElementRef)
    {
        super(translation, myElement);
        // initialize placeholder
        this._placeholder = this._translation.translate('terraNoteEditor.insertText');

        this._modules = quillNotePreset;
    }
}
