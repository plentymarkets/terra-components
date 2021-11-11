import { Injectable } from '@angular/core';
import { TerraNodeTreeConfig } from '../../../tree/node-tree/data/terra-node-tree.config';
import { CategoryDataInterface } from '../data/category-data.interface';

@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryDataInterface> {}
