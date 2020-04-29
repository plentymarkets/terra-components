import { TerraDataTableContextMenuDirective } from './tables/data-table/context-menu/terra-data-table-context-menu.directive';
import { Type } from '@angular/core';
import { TerraTwoColumnsContainerDirective } from './layouts/column-container/two-columns/terra-two-columns-container.directive';
import { FixedHeaderDirective } from './tables/fixed-header/fixed-header.directive';
import { TerraLabelTooltipDirective } from '../helpers/terra-label-tooltip.directive';
import { FormEntryContainerDirective } from './forms/form/form-entry/form-entry-container.directive';
import { CKEditorDirective } from './editors/ck-editor/ck-editor.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

export const directives: Array<Type<any>> = [
    TerraDataTableContextMenuDirective,
    TerraTwoColumnsContainerDirective,
    FixedHeaderDirective,
    TerraLabelTooltipDirective,
    FormEntryContainerDirective,
    CKEditorDirective,
    TooltipDirective
];
