import { NgModule } from '@angular/core';
import { components, exportedComponents } from './components/component-collection';
import { directives, exportedDirectives } from './components/directive-collection';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L10nIntlModule, L10nTranslationModule } from 'angular-l10n';
import { MyDatePickerModule } from 'mydatepicker';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from 'ckeditor4-angular';
import { exportedPipes, pipes } from './pipes/pipe-collection';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { A11yModule } from '@angular/cdk/a11y';
import { MatInputModule } from '@angular/material/input';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { TerraTooltipModule } from './components/tooltip/terra-tooltip.module';

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
        MatListModule,
        MatDialogModule,
        MatButtonModule,
        DragDropModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSliderModule,
        MatDatepickerModule,
        A11yModule,
        MatSelectModule,
        MatPseudoCheckboxModule,
        MatTreeModule,
        MatToolbarModule,
        MatTableModule,
        MatExpansionModule,
        L10nIntlModule,
        TerraTooltipModule
    ],
    declarations: [...components, ...directives, ...pipes],
    exports: [...exportedComponents, ...exportedDirectives, ...exportedPipes, TerraTooltipModule]
})
export class TerraComponentsModule {}
