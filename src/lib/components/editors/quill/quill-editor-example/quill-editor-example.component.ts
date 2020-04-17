import { Component } from '@angular/core';
import {
  quillBasePreset,
  quillNotePreset
} from '../presets';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'tc-quill-editor-example',
  templateUrl: './quill-editor-example.component.html'
})
export class QuillEditorExample
{
  public _basePreset:QuillModules = quillBasePreset;
  public _notePreset:QuillModules = quillNotePreset;
}
