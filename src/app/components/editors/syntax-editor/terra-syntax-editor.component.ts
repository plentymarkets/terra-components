import {
    AfterViewInit,
    Component,
    Input,
    ViewChild
} from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import 'brace';
import 'brace/theme/chrome';
import 'brace/mode/typescript';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/scss';
import 'brace/mode/html';
import 'brace/mode/markdown';
import 'brace/mode/twig';
import 'brace/mode/php';
import 'brace/mode/text';
import 'brace/ext/error_marker';
import { TerraSyntaxEditorData } from './data/terra-syntax-editor.data';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { noop } from 'rxjs/util/noop';

@Component({
    selector: 'terra-syntax-editor',
    template: require('./terra-syntax-editor.component.html'),
    providers:[{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TerraSyntaxEditorComponent,
        multi: true
    }]
})
export class TerraSyntaxEditorComponent implements AfterViewInit, ControlValueAccessor
{
    @ViewChild('aceEditor')
    public editor:AceEditorComponent;

    @Input()
    public inputReadOnly:boolean;

    @Input()
    public inputOptions:Object;

    protected onModelChange:(value:any) => void = noop;
    protected onTouched:() => void = noop;

    private _inputEditorMode:string;
    private _inputText:string;

    constructor()
    {
        this.inputOptions = {
            maxLines: 10000
        };
    }

    public ngAfterViewInit():void
    {
        this.editor.getEditor().clearSelection();
        this.editor.getEditor().$blockScrolling = Infinity;
        this.editor.getEditor().setShowPrintMargin(false);
    }

    public setAnnotationList(list:Array<TerraSyntaxEditorData>):void
    {
        this.editor.getEditor().getSession().setAnnotations(list);
    }

    @Input()
    public set inputEditorMode(value:string)
    {
        this._inputEditorMode = value;
        this.editor.setMode(value);
    }

    @Input()
    public set inputText(value:string)
    {
        this._inputText = value;
        this.editor.setText(value);
    }

    public get inputText():string
    {
        return this._inputText;
    }

    public registerOnChange(fn:any):void
    {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouched = fn;
    }

    public writeValue(text:string):void
    {
        this._inputText = text;
    }
}
