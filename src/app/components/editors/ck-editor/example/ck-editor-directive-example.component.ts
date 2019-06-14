import { Component } from '@angular/core';
import {
    ckEditorFullConfig,
    ckEditorMinimumConfig
} from '../presets/ck-editor-presets';

@Component({
    selector: 'tc-full-directive-example',
    template: require('./ck-editor-directive-example.component.html')
})
export class CkEditorDirectiveExample
{
    protected config:{} = ckEditorFullConfig;
    protected tiny:{} = ckEditorMinimumConfig;
}
