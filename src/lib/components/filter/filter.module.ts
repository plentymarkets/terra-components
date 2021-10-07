import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FilterActionsDirective } from './directives/filter-actions.directive';
import { FilterChipDefDirective } from './directives/filter-chip-def.directive';
import { FilterMenuDirective } from './directives/filter-menu.directive';
import { FilterContainerDirective } from './directives/filter-container.directive';
import { FilterContentDirective } from './directives/filter-content.directive';
import { FilterCloseDirective } from './directives/filter-close.directive';
import { FilterChipLabelDirective } from './directives/filter-chip-label.directive';
import { FilterToolbarComponent } from './components/filter-toolbar/filter-toolbar.component';
import { ChipDisplayValuePipe } from './pipes/chip-display-value.pipe';
import { ChipDisplayWhenPipe } from './pipes/chip-display-when.pipe';
//import { FilterToolbarSearchInputComponent } from './components/filter-toolbar/filter-search-input/filter-search-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/** Exports all the functionality needed to create a filter for a table. */
@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule
    ],
    declarations: [
        FilterActionsDirective,
        FilterContainerDirective,
        FilterContentDirective,
        FilterChipDefDirective,
        FilterChipLabelDirective,
        FilterMenuDirective,
        //FilterToolbarSearchInputComponent,
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
        //FilterToolbarSearchInputComponent,
        FilterToolbarComponent,
        MatMenuModule, // every user needs this to create the filter menu
        FilterCloseDirective
    ]
})
export class TerraFilterModule {}
