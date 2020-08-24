/**
 * Provided configs for the ckeditor. You can create your own config. See more
 * {@link https://ckeditor.com/latest/samples/toolbarconfigurator/index.html#basic}
 */

/**
 * @description A complex config.
 */
export const ckEditorFullConfig: {} = {
    toolbarGroups: [
        {
            name: 'styles',
            groups: ['styles']
        },
        {
            name: 'colors',
            groups: ['colors']
        },
        {
            name: 'basicstyles',
            groups: ['basicstyles', 'cleanup']
        },
        {
            name: 'paragraph',
            groups: ['align', 'list', 'indent', 'blocks', 'bidi', 'paragraph']
        },
        {
            name: 'clipboard',
            groups: ['clipboard', 'undo']
        },
        {
            name: 'document',
            groups: ['mode', 'document', 'doctools']
        },
        {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker', 'editing']
        },
        {
            name: 'forms',
            groups: ['forms']
        },
        {
            name: 'links',
            groups: ['links']
        },
        {
            name: 'insert',
            groups: ['insert']
        },
        {
            name: 'tools',
            groups: ['tools']
        },
        {
            name: 'others',
            groups: ['others']
        },
        {
            name: 'about',
            groups: ['about']
        }
    ],
    extraPlugins: [],
    removeButtons:
        'CopyFormatting,Subscript,Superscript,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Cut,Copy,PasteText,' +
        'Paste,Save,Preview,Print,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,' +
        'Flash,Smiley,PageBreak'
};
