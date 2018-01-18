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

@Component({
    selector: 'terra-syntax-editor',
    template: require('./terra-syntax-editor.component.html'),
    styles:   [require('./terra-syntax-editor.component.scss')]
})
export class TerraSyntaxEditorComponent implements AfterViewInit
{
    @ViewChild('aceEditor') editor:AceEditorComponent;
    @Input() inputReadOnly:boolean;
    @Input() inputOptions:Object;
    private _inputEditorMode:string;
    private _inputText:string;

    constructor()
    {
        this.inputOptions = {
            maxLines: 10000
        };
    }

    ngAfterViewInit()
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
}
