import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { matExamples } from './mat-examples';
import { TerraComponentsModule } from '../../terra-components.module';

@NgModule({
    declarations:    matExamples,
    imports:         [
        CommonModule,
        TerraComponentsModule,
        MatSelectModule
    ],
    exports:         matExamples,
    entryComponents: matExamples
})
export class MatExamplesModule
{
}
