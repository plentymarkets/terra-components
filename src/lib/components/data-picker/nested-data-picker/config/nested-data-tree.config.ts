import { Injectable } from '@angular/core';
import { TerraNodeTreeConfig } from '../../../tree/node-tree/data/terra-node-tree.config';
import { NestedDataInterface } from '../data/nested-data.interface';

@Injectable()
export class NestedDataTreeConfig<T> extends TerraNodeTreeConfig<NestedDataInterface<T>>
{}
