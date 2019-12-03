import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { examples } from './components/example-collection';
import { TerraComponentsModule } from './terra-components.module';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CKEditorModule,
        TerraComponentsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatIconModule,
        MatSelectModule
    ],
    declarations:    [...examples],
    entryComponents: [...examples],
    exports:         [...examples]
})
export class TerraComponentsExamplesModule
{}
