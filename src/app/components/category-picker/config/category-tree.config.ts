import {
    CategoryTreeData,
    TerraNodeTreeConfig
} from '../../../../';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryTreeData>
{
    constructor(public _translation:TranslationService)
    {
        super(_translation);
    }
}
