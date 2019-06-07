import { Component } from '@angular/core';
import {
    ckEditorFullConfig,
    ckEditorMinimumConfig
} from '../presets/ck-editor-presets';

@Component({
    selector: 'tc-full-directive-example',
    template: require('./ck-editor-full.directive.example.html')
})
export class CkEditorFullDirectiveExample
{
    protected config:{} = ckEditorFullConfig;
    protected tiny:{} = ckEditorMinimumConfig;
}
