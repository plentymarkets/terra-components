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

/**
 * @deprecated Use [ckEditor](https://github.com/ckeditor/ckeditor4-angular) instead.
 */
@Component({
    selector:    'terra-syntax-editor',
    templateUrl: './terra-syntax-editor.component.html'
})
export class TerraSyntaxEditorComponent implements AfterViewInit
{
    @ViewChild('aceEditor', { static: true })
    public editor:AceEditorComponent;

    @Input()
    public inputReadOnly:boolean;

    @Input()
    public inputOptions:Object;

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

    public get inputEditorMode():string
    {
        return this._inputEditorMode;
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
}
