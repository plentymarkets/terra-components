import { Type } from '@angular/core';
import { SelectSortPipe } from './select-sort.pipe';
import { TickIntervalPipe } from '../components/forms/form/form-components/slider/pipes/tick-interval.pipe';

export const exportedPipes: Array<Type<any>> = [SelectSortPipe];
export const pipes: Array<Type<any>> = [...exportedPipes, TickIntervalPipe];
