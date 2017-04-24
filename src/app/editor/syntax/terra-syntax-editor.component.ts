import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraSyntaxEditorModes } from './modes/terra-syntax-editor-modes';
import 'brace';
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

@Component({
               selector: 'terra-syntax-editor',
               template: require('./terra-syntax-editor.component.html'),
               styles:   [require('./terra-syntax-editor.component.scss')]
           })
export class TerraSyntaxEditorComponent implements OnInit
{
    @Input() inputEditorMode:TerraSyntaxEditorModes = TerraSyntaxEditorModes.TEXT;
    @Input() inputText:string = '';
    @Input() inputReadOnly:boolean;
    @Input() inputOptions:Object = {};
    
    constructor()
    {
        this.inputOptions = {maxLines: 10000};
    }
    
    ngOnInit()
    {
    
    }
    
    getEditorMode():string
    {
        switch(this.inputEditorMode)
        {
            case TerraSyntaxEditorModes.CSS:
                return 'css';
                
            case TerraSyntaxEditorModes.JAVASCRIPT:
                return 'javascript';
                
            case TerraSyntaxEditorModes.JSON:
                return 'json';
                
            case TerraSyntaxEditorModes.SCSS:
                return 'scss';
                
            case TerraSyntaxEditorModes.HTML:
                return 'html';
                
            case TerraSyntaxEditorModes.MARKDOWN:
                return 'markdown';
            
            case TerraSyntaxEditorModes.TWIG:
                return 'twig';
                
            case TerraSyntaxEditorModes.PHP:
                return 'php';
                
            case TerraSyntaxEditorModes.TYPESCRIPT:
                return 'typescript';
                
            case TerraSyntaxEditorModes.TEXT:
            default:
            return 'text';
        }
    }
}
