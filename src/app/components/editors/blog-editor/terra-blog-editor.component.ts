import {
    Component,
    ElementRef
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';
import * as Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);


function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('What is the image URL');
    if(value){
        this.quill.insertEmbed(range.index, 'image', value, 'user');
    }
}

@Component({
    selector:  'terra-blog-editor',
    template:  require('./terra-blog-editor.component.html'),
    styles:    [
        require('./terra-blog-editor.component.glob.scss').toString()
    ],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraBlogEditorComponent,
        multi:       true
    }]
})
export class TerraBlogEditorComponent extends TerraBaseEditorComponent
{
    constructor(protected translation:TranslationService, protected myElement:ElementRef)
    {
        super(translation, myElement);

        this.modules = {
            imageResize: {
                // ...
                displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                    // other camelCase styles for size display
                }
            },
            toolbar: {
                container: [
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
                    ['link', 'image', 'video']
                ],
                handlers: {
                    image: imageHandler
                }
            },
        };
    }
}
