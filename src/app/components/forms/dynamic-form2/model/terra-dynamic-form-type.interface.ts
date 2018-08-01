import { Type } from '@angular/core';

export interface TerraDynamicFormTypeInterface
{
    component:Type<any>;
    inputMap:{[key:string]:string};
}