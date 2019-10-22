import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-syntax-editor-example',
    styleUrls: [ './terra-syntax-editor.component.example.scss'],
    templateUrl: './terra-syntax-editor.component.example.html',
})
export class TerraSyntaxEditorComponentExample implements OnInit
{
    public _inputText:string;
    private _inputOptions:object;

    public ngOnInit():void
    {
        this._inputText = `<!DOCTYPE html>
<html>
<head>
    <meta CHARSET="UTF-8">
    <title>Website</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>`;
        this._inputOptions = {
            maxLines:  10,
            inputText: this._inputText
        };
    }

}
