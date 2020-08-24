import { TerraNodeTreeConfig } from '../../../tree/node-tree/data/terra-node-tree.config';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';
import { CategoryDataInterface } from '../data/category-data.interface';

@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryDataInterface> {
    constructor(translation: TranslationService) {
        super(translation);
    }
}
