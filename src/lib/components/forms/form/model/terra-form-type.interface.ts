import { Type } from '@angular/core';

export interface TerraFormTypeInterface {
    component: Type<any>;
    inputMap: { [key: string]: string };
}
