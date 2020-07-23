import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { examples } from './components/example-collection';
import { TerraComponentsModule } from './terra-components.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CKEditorModule,
        MatFormFieldModule,
        TerraComponentsModule
    ],
    declarations:    [...examples],
    entryComponents: [...examples],
    exports:         [...examples]
})
export class TerraComponentsExamplesModule
{}
