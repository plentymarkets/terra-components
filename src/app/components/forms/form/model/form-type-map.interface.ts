import { TerraFormTypeInterface } from './terra-form-type.interface';
import { Type } from '@angular/core';
import { TerraKeyValueInterface } from '../../../../models/terra-key-value.interface';

export declare type FormTypeMapInterface = TerraKeyValueInterface<Type<any> | TerraFormTypeInterface>;
