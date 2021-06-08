import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {
    FilterActionsDirective,
    FilterChipDefDirective,
    FilterChipLabelDirective,
    FilterCloseDirective,
    FilterContainerDirective,
    FilterContentDirective,
    FilterMenuDirective
} from './directives';
import { FilterToolbarComponent } from './components';
import { ChipDisplayValuePipe, ChipDisplayWhenPipe } from './pipes';

/** Exports all the functionality needed to create a filter for a table. */
@NgModule({
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatChipsModule, MatMenuModule],
    declarations: [
        FilterActionsDirective,
        FilterContainerDirective,
        FilterContentDirective,
        FilterChipDefDirective,
        FilterChipLabelDirective,
        FilterMenuDirective,
        FilterToolbarComponent,
        ChipDisplayValuePipe,
        FilterCloseDirective,
        ChipDisplayWhenPipe
    ],
    exports: [
        FilterActionsDirective,
        FilterContainerDirective,
        FilterContentDirective,
        FilterChipDefDirective,
        FilterChipLabelDirective,
        FilterMenuDirective,
        FilterToolbarComponent,
        MatMenuModule, // every user needs this to create the filter menu
        FilterCloseDirective
    ]
})
export class FilterModule {}
