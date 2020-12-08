import { Type } from '@angular/core';
import { TerraDataTableContextMenuDirective } from './tables/data-table/context-menu/terra-data-table-context-menu.directive';
import { TerraTwoColumnsContainerDirective } from './layouts/column-container/two-columns/terra-two-columns-container.directive';
import { FormEntryContainerDirective } from './forms/form/form-entry/form-entry-container.directive';
import { CKEditorDirective } from './editors/ck-editor/ck-editor.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { SelectSortDirective } from './forms/select-box/directive/select-sort.directive';

export const exportedDirectives: Array<Type<any>> = [
    TerraDataTableContextMenuDirective,
    TerraTwoColumnsContainerDirective,
    CKEditorDirective,
    TooltipDirective,
    SelectSortDirective
];

export const directives: Array<Type<any>> = [...exportedDirectives, FormEntryContainerDirective];
