import { TerraNodeTreeConfig } from '../../../../';
import { TranslationService } from 'angular-l10n';
import { Injectable } from '@angular/core';
import { CategoryDataInterface } from '../data/category-data.interface';

@Injectable()
export class CategoryTreeConfig extends TerraNodeTreeConfig<CategoryDataInterface>
{
    constructor(public _translation:TranslationService)
    {
        super(_translation);
    }
}
