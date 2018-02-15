
import { TerraNodeTreeConfig } from '../../tree/node-tree/data/terra-node-tree.config';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core'
import { CategoryTreeData } from '../data/category-tree.data';

@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryTreeData>
{
    constructor(public _translation:TranslationService)
    {
        super(_translation);
    }
}
