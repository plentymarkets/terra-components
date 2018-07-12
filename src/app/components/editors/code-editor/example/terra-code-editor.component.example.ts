import { Component } from '@angular/core';

@Component({
    selector: 'terra-code-editor-example',
    styles:   [require('./terra-code-editor.component.example.scss')],
    template: require('./terra-code-editor.component.example.html')
})
export class TerraCodeEditorComponentExample
{
    public changedText:string;
}
