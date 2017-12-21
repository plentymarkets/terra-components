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
import { isNullOrUndefined } from 'util';

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
    @Input() inputPlaceholder:string;

    private _editorStyles: {[property:string]:any} = {};

    @Input()
    public set inputEditorStyles( styles: {[property:string]:any} )
    {
        this._editorStyles = styles;
    }

    public get inputEditorStyles():{[property:string]:any}
    {
        let styles = this._editorStyles;
        if ( isNullOrUndefined( styles.minHeight ) )
        {
            styles.minHeight = "100px";
        }
        return styles;
    }

    private _inputEditorModules:{ [index:string]:Object };

    @Input()
    public set inputEditorModules(modules:{ [index:string]:Object })
    {
        this._modules = this._modules;
    }

    public get inputEditorModules():{ [index:string]:Object }
    {
        if ( isNullOrUndefined( this._inputEditorModules ) )
        {
            return this._modules;
        }

        return this._inputEditorModules;
    }

    @Output() ngModelChange:EventEmitter<string> = new EventEmitter();

    private _placeholder:string;
    private _value:string;
    private _onChangeCallback:() => void;
    private _onTouchedCallback:() => void;
    private _modules:{ [index:string]:Object };

    constructor(private translation:TranslationService)
    {
        // initialize placeholder
        this._placeholder = this.translation.translate('terraNoteEditor.insertText');

        this._modules = {
            toolbar: [
                ['bold',
                 'italic',
                 'underline',
                 'strike'],        // toggled buttons

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
