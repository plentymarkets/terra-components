import { Injectable } from '@angular/core';
import { TerraNodeTreeConfig } from '../../../tree/node-tree/data/terra-node-tree.config';
import { CategoryDataInterface } from '../data/category-data.interface';

/** @deprecated v5. Will be removed in the next major release. */
@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryDataInterface>
{}
