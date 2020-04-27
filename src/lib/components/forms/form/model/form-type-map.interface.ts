import { TerraFormTypeInterface } from './terra-form-type.interface';
import { Type } from '@angular/core';
import { TerraKeyValueInterface } from '../../../../models';

export declare type FormTypeMapInterface = TerraKeyValueInterface<
  Type<any> | TerraFormTypeInterface
>;
