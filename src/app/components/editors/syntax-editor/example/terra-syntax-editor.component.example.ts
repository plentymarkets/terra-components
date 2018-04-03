import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-syntax-editor-example',
    styles:   [require('./terra-syntax-editor.component.example.scss')],
    template: require('./terra-syntax-editor.component.example.html'),
})
export class TerraSyntaxEditorComponentExample implements OnInit
{
    private _inputOptions:object;

    public ngOnInit():void
    {
        this._inputOptions = {
            maxLines: 10
        };
    }

}
