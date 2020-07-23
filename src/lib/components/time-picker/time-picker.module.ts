import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TimePickerComponent } from './time-picker.component';
import { TimeDigitPipe } from './time-digit.pipe';


@NgModule({
    imports:         [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    declarations:    [TimePickerComponent, TimeDigitPipe],
    exports:         [TimePickerComponent],
    entryComponents: [TimePickerComponent]
})
export class TimePickerModule
{}
