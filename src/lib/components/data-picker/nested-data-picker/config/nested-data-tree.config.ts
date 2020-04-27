import { TerraNodeTreeConfig } from '../../../tree/node-tree/data/terra-node-tree.config';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';
import { NestedDataInterface } from '../data/nested-data.interface';

@Injectable()
export class NestedDataTreeConfig<T> extends TerraNodeTreeConfig<NestedDataInterface<T>> {
  constructor(translation: TranslationService) {
    super(translation);
  }
}
