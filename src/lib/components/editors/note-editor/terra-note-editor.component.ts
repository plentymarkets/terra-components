import {
    Component,
    ElementRef
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';

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
    constructor(protected translation:TranslationService, protected myElement:ElementRef)
    {
        super(translation, myElement);
        // initialize placeholder
        this.placeholder = this.translation.translate('terraNoteEditor.insertText');

        this.modules = {
            toolbar: [
                ['bold',
                 'italic',
                 'underline',
                 'strike'],
                // toggled buttons
                [{'list': 'ordered'},
                 {'list': 'bullet'}],
                [{'script': 'sub'},
                 {'script': 'super'}],
                // superscript/subscript
                [{
                    'header': [1,
                               2,
                               3,
                               4,
                               5,
                               6,
                               false]
                }],
                // link and image, video
                ['link',
                 'image']
            ]
        };
    }
}
