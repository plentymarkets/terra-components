import { NgModule } from '@angular/core';
import { components, exportedComponents } from './components/component-collection';
import { directives, exportedDirectives } from './components/directive-collection';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L10nTranslationModule } from 'angular-l10n';
import { MyDatePickerModule } from 'mydatepicker';
import { RouterModule } from '@angular/router';
import { TerraInteractModule } from './components/interactables/interact.module';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from 'ckeditor4-angular';
import { pipes } from './pipes/pipe-collection';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        L10nTranslationModule,
        ModalModule.forRoot(),
        MyDatePickerModule,
        QuillModule.forRoot(),
        CKEditorModule,
        TerraInteractModule,
        MatListModule,
        MatDialogModule,
        MatButtonModule,
        DragDropModule
    ],
    declarations: [...components, ...directives, ...pipes],
    entryComponents: [...exportedComponents],
    exports: [...exportedComponents, ...exportedDirectives, ...pipes]
})
export class TerraComponentsModule {}
