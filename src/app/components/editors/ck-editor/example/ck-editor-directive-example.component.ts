import { Component } from '@angular/core';
import { ckEditorMinimumConfig } from '../presets/ck-editor-minimum-preset';
import { ckEditorFullConfig } from '../presets/ck-editor-full-preset';

@Component({
    selector: 'tc-full-directive-example',
    template: require('./ck-editor-directive-example.component.html')
})
export class CkEditorDirectiveExample
{
    protected config:{} = ckEditorFullConfig;
    protected tiny:{} = ckEditorMinimumConfig;
}
