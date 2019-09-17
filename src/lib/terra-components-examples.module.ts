import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { examples } from './components/example-collection';
import { TerraComponentsModule } from './terra-components.module';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatExamplesModule } from './components/material/mat-examples.module';

@NgModule({
    imports:         [
        CommonModule,
        FormsModule,
        CKEditorModule,
        TerraComponentsModule,
        MatExamplesModule
    ],
    declarations:    [...examples],
    entryComponents: [...examples],
    exports:         [...examples]
})
export class TerraComponentsExamplesModule
{}
