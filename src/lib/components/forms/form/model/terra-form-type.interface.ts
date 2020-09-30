import { Type } from '@angular/core';

export interface TerraFormTypeInterface {
    component: Type<unknown>;
    inputMap: { [key: string]: string };
}
