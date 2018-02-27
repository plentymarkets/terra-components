import { TerraBaseService } from '../../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { CategoryPagerDataInterface } from '../data/category-pager-data.interface';
import { Injectable } from '@angular/core';

/**
 * @author ziyad.hajj-hassan
 */

@Injectable()
export abstract class TerraCategoryPickerBaseService extends TerraBaseService
{
    constructor(private _loadingSpinnerService:TerraLoadingSpinnerService,
                private _httpService:Http)
    {
        super(_loadingSpinnerService, _httpService, '');
    }

    /**
     * @description Placeholder for the specific data-retrieval method. In General the specific rest call is given here.
     * @param {string | number} categoryId
     * @returns {Observable<CategoryPagerDataInterface>}
     */
    public abstract requestCategoryData(categoryId:string | number):Observable<CategoryPagerDataInterface>
}
