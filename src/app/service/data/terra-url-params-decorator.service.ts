import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { TerraPagerParameterInterface } from '../../components/pager/data/terra-pager.parameter.interface';

/**
 * @author ptopczewski
 * @deprecated use the createUrlSearchParams-Method of the TerraBaseService instead!
 */
@Injectable()
export class TerraUrlParamsDecorator
{
    /**
     * set terra pager parameter to a given UrlSearchParams object
     * @param {URLSearchParams} urlSearchParams
     * @param {TerraPagerParameterInterface} terraPagerParameter
     */
    public setTerraPagerParameter(urlSearchParams:URLSearchParams, terraPagerParameter:TerraPagerParameterInterface):void
    {
        if(terraPagerParameter.page)
        {
            urlSearchParams.set('page', terraPagerParameter.page.toString());
        }

        if(terraPagerParameter.itemsPerPage)
        {
            urlSearchParams.set('itemsPerPage', terraPagerParameter.itemsPerPage.toString());
        }
    }
}
