import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslationModule } from 'angular-l10n';
import { TerraTimePickerComponent } from './terra-time-picker.component';

@NgModule({
    imports:         [
        CommonModule,
        ReactiveFormsModule,
        TranslationModule,
        MatSelectModule
    ],
    exports:         [TerraTimePickerComponent],
    declarations:    [TerraTimePickerComponent],
    entryComponents: [TerraTimePickerComponent]
})
export class TerraTimePickerModule
{}
