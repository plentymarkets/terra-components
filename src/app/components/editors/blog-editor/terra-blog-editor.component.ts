import {
    Component,
    ElementRef
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';
import { AceEditorConfig } from '../config/ace-editor.config';
import { AceEditorOptionsInterface } from '../config/ace-editor-options.interface';

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
    public showCodeView:boolean = false;
    protected aceOptions:AceEditorOptionsInterface = AceEditorConfig.options;

    constructor(protected translation:TranslationService, protected myElement:ElementRef)
    {
        super(translation, myElement);

        const self:TerraBlogEditorComponent = this;

        function codeHandler():void
        {
            // 'this' points to the toolbar instance of the quill editor.
            self.showCodeView = !self.showCodeView;
        }

        function imageHandler():void
        {
            let range:any = this.quill.getSelection();
            let value:string = prompt('Enter the image URL');
            if(value)
            {
                this.quill.insertEmbed(range.index, 'image', value, 'user');
            }
        }

        this.modules = {
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
                        'header': [1, 2, 3, 4, 5, 6, false]
                    }],
                    // link and image, video
                    ['link', 'image', 'video'],
                    ['code-block']
                ],
                handlers: {
                    image: imageHandler,
                    'code-block': codeHandler
                }
            },
        };
    }
}
