import { Component } from '@angular/core';
import {
  quillBasePreset,
  quillNotePreset
} from '../presets';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'tc-quill-editor-example',
  templateUrl: './quill-editor.component.example.html'
})
export class QuillEditorComponentExample
{
  public _basePreset:QuillModules = quillBasePreset;
  public _notePreset:QuillModules = quillNotePreset;
}
