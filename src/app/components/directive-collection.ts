import { TerraDataTableContextMenuDirective } from './tables/data-table/context-menu/directive/terra-data-table-context-menu.directive';
import { Type } from '@angular/core';
import { TerraTwoColumnsContainerDirective } from './layouts/column-container/terra-two-columns-container.directive';
import { FixedHeaderDirective } from './tables/fixed-header/fixed-header.directive';

export const directives:Array<Type<any>> = [
    TerraDataTableContextMenuDirective,
    TerraTwoColumnsContainerDirective,
    FixedHeaderDirective
];
