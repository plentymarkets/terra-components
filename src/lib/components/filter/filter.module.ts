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
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraTooltipModule } from '../tooltip/terra-tooltip.module';

/** Exports all the functionality needed to create a filter for a table. */
@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        L10nTranslationModule,
        TerraTooltipModule
    ],
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
export class TerraFilterModule {}
