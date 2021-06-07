import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    FilterActionsDirective,
    FilterChipDefDirective,
    FilterChipLabelDirective,
    FilterContainerDirective,
    FilterContentDirective,
    FilterMenuDirective,
    FilterCloseDirective
} from './directives';
import { FilterToolbarComponent } from './components';
import { ChipDisplayValuePipe } from './pipes';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

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
        FilterCloseDirective
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
