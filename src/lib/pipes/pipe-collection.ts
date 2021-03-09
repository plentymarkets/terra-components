import { Type } from '@angular/core';
import { SelectSortPipe } from './select-sort.pipe';
import { IsStickyPipe } from '../components/table/table-settings/pipes/is-sticky.pipe';

export const pipes: Array<Type<any>> = [SelectSortPipe, IsStickyPipe];
