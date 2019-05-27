import { Component } from '@angular/core';

@Component({
    selector: 'terra-blog-editor-example',
    template: `<terra-blog-editor [(ngModel)]="blog"></terra-blog-editor>
    {{blog}}
              <div [innerHTML]="blog"></div>`
})
export class TerraBlogEditorComponentExample
{
    protected blog:any;
}
