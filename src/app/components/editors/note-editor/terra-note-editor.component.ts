import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {TerraBaseEditorComponent} from "../base-editor/terra-base-editor.component";

@Component({
    selector:  'terra-note-editor',
    template:  require('./terra-note-editor.component.html'),
    styles:    [
        require('./terra-note-editor.component.scss'),
        require('quill/dist/quill.bubble.css'),
        require('quill/dist/quill.snow.css'),
        require('./terra-note-editor.component.glob.scss').toString()
    ],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraNoteEditorComponent,
        multi:       true
    }]
})
export class TerraNoteEditorComponent extends TerraBaseEditorComponent
{
    // private _modules:{ [index:string]:Object };

    constructor(protected translation:TranslationService, protected _myElement:ElementRef)
    {
        super(translation, _myElement);
        // initialize placeholder
        this._placeholder = this.translation.translate('terraNoteEditor.insertText');

        this._modules = {
            toolbar: [
                ['bold',
                 'italic',
                 'underline',
                 'strike'],        // toggled buttons
                ['code-block'],
                [{'list': 'ordered'},
                 {'list': 'bullet'}],
                [{'script': 'sub'},
                 {'script': 'super'}],      // superscript/subscript

                [{
                    'header': [1,
                               2,
                               3,
                               4,
                               5,
                               6,
                               false]
                }],

                ['link',
                 'image']                         // link and image, video
            ]
        };
    }

}
