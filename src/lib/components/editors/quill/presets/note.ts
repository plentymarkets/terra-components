import { QuillModules } from 'ngx-quill';

export const quillNotePreset:QuillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],
        ['link', 'image'] // link and image, video
    ]
};
