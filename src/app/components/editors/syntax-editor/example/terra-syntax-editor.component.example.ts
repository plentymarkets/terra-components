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
    public inputText:string;
    private inputOptions:object;

    public ngOnInit():void
    {
        this.inputText = `<!DOCTYPE html>
<html>
<head>
    <meta CHARSET="UTF-8">
    <title>Website</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>`;
        this.inputOptions = {
            maxLines:  10,
            inputText: this.inputText
        };
    }

}
