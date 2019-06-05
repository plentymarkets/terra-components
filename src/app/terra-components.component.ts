import {
    Component,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector:      'terra-app-root',
    template:      require('./terra-components.component.html'),
    styles:        [require('./terra-components.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class TerraComponentsComponent
{
    private viewContainerRef:ViewContainerRef;

    protected config:{};

    constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;

        this.config = {
            toolbarGroups: [
                {
                    name:   'styles',
                    groups: ['styles']
                },
                {
                    name:   'colors',
                    groups: ['colors']
                },
                {
                    name:   'basicstyles',
                    groups: ['basicstyles',
                             'cleanup']
                },
                {
                    name:   'paragraph',
                    groups: ['align',
                             'list',
                             'indent',
                             'blocks',
                             'bidi',
                             'paragraph']
                },
                {
                    name:   'clipboard',
                    groups: ['clipboard',
                             'undo']
                },
                {
                    name:   'document',
                    groups: ['mode',
                             'document',
                             'doctools']
                },
                {
                    name:   'editing',
                    groups: ['find',
                             'selection',
                             'spellchecker',
                             'editing']
                },
                {
                    name:   'forms',
                    groups: ['forms']
                },
                {
                    name:   'links',
                    groups: ['links']
                },
                {
                    name:   'insert',
                    groups: ['insert']
                },
                {
                    name:   'tools',
                    groups: ['tools']
                },
                {
                    name:   'others',
                    groups: ['others']
                },
                {
                    name:   'about',
                    groups: ['about']
                }
            ],
            removeButtons: 'CopyFormatting,Subscript,Superscript,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Cut,Copy,PasteText,Paste,Save,Preview,Print,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,Smiley,PageBreak,Iframe'
        };
    }
}
