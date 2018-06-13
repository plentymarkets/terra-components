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
export class TerraNoteEditorComponent implements OnInit, ControlValueAccessor
{
    @Input()
    public inputPlaceholder:string;

    @Output()
    public ngModelChange:EventEmitter<string> = new EventEmitter();

    private _placeholder:string;
    private _value:string;
    private _modules:{ [index:string]:Object };

    constructor(private translation:TranslationService,
                private _myElement:ElementRef)
    {
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

    public registerOnChange(fn:() => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public focus():void
    {
        this._myElement.nativeElement.querySelector('.ql-editor').focus();
    }

    private _onChangeCallback:() => void = ():void => undefined;
    private _onTouchedCallback:() => void = ():void => undefined;
}
