import {
    Component,
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

@Component({
    selector:  'terra-notes-editor',
    template:  require('./terra-notes-editor.component.html'),
    styles:    [
        require('./terra-notes-editor.component.scss'),
        require('quill/dist/quill.bubble.css'),
        require('quill/dist/quill.snow.css')
    ],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraNotesEditorComponent,
        multi:       true
    }]
})
export class TerraNotesEditorComponent implements OnInit, ControlValueAccessor
{
    @Input() inputPlaceholder:string;

    @Output() ngModelChange:EventEmitter<string> = new EventEmitter();

    private _placeholder:string;
    private _value:string;
    private _onChangeCallback:() => void;
    private _onTouchedCallback:() => void;
    private _modules:{ [index: string]: Object };

    constructor(private translation:TranslationService)
    {
        // initialize placeholder
        this._placeholder = this.translation.translate('terraEditor.insertText');
        
        this._modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

                ['link', 'image']                         // link and image, video
            ]
        };

        // initialize callbacks
        this._onChangeCallback = () =>
        {
        };
        this._onTouchedCallback = () =>
        {
        };
    }

    public ngOnInit():void
    {
        // overwrite default placeholder if input is defined
        if(this.inputPlaceholder)
        {
            this._placeholder = this.inputPlaceholder;
        }
    }

    public writeValue(value:string):void
    {
        this._value = value;
    }

    public registerOnChange(fn:any):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this._onTouchedCallback = fn;
    }
}
