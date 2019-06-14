/**
 * Provided configs for the ckeditor. You can create your own config. See more
 * {@link https://ckeditor.com/latest/samples/toolbarconfigurator/index.html#basic}
 */

/**
 * @description A complex config.
 */
export const ckEditorFullConfig:{} =
    {
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
        extraPlugins:  [],
        removeButtons: 'CopyFormatting,Subscript,Superscript,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Cut,Copy,PasteText,' +
                       'Paste,Save,Preview,Print,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,' +
                       'Flash,Smiley,PageBreak'
    };

/**
 * @description A minimal config.
 */
export const ckEditorMinimumConfig:{} =
    {
        toolbarGroups: [
            {
                name:   'styles',
                groups: ['styles']
            },
            {
                name:   'clipboard',
                groups: ['undo',
                         'clipboard']
            },
            {
                name:   'basicstyles',
                groups: ['basicstyles',
                         'cleanup']
            },
            {
                name:   'colors',
                groups: ['colors']
            },
            {
                name:   'paragraph',
                groups: ['list',
                         'indent',
                         'blocks',
                         'align',
                         'bidi',
                         'paragraph']
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
                name:   'document',
                groups: ['mode',
                         'document',
                         'doctools']
            },
            {
                name:   'tools',
                groups: ['tools']
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
                name:   'others',
                groups: ['others']
            },
            {
                name:   'about',
                groups: ['about']
            }
        ],
        removeButtons: 'NewPage,Save,Source,Preview,Print,Templates,Copy,Cut,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Select,' +
                       'Textarea,Button,ImageButton,HiddenField,Paste,PasteText,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,' +
                       'Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Anchor,Flash,' +
                       'Table,HorizontalRule,Smiley,SpecialChar,Iframe,PageBreak,ShowBlocks,About,Styles,Font,FontSize'
    };
