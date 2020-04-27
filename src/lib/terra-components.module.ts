import { NgModule } from '@angular/core';
import { components, exportedComponents } from './components/component-collection';
import { directives } from './components/directive-collection';
import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { MyDatePickerModule } from 'mydatepicker';
import { AceEditorModule } from 'ng2-ace-editor';
import { RouterModule } from '@angular/router';
import { TerraInteractModule } from './components/interactables/interact.module';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocalizationModule,
    ModalModule.forRoot(),
    MyDatePickerModule,
    AceEditorModule,
    QuillModule,
    CKEditorModule,
    TerraInteractModule
  ],
  declarations: [...components, ...directives],
  entryComponents: [...exportedComponents],
  exports: [...exportedComponents, ...directives]
})
export class TerraComponentsModule {}
