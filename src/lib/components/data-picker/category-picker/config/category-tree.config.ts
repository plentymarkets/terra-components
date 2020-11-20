import { TerraNodeTreeConfig } from '../../../tree/node-tree/data/terra-node-tree.config';
import { L10nTranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';
import { CategoryDataInterface } from '../data/category-data.interface';

@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryDataInterface> {
    constructor(translation: L10nTranslationService) {
        super(translation);
    }
}
