import {
    Observable,
    of
} from 'rxjs';
import { isNullOrUndefined } from 'util';
import { tap } from 'rxjs/operators';
import { TerraKeyValueInterface } from '../models';
import { TerraBaseParameterInterface } from '../components/data/terra-base-parameter.interface';

/**
 * @experimental
 * @description This class provides basic functionality to cache data for a model accessible on a server
 */
// TODO: use Generic <T> to be able to pass a type def for everything
export class ModelCache
{
    protected dataModel:TerraKeyValueInterface<any> = {};

    /**
     * @description Handles the retrieval of a list. When the list has already been loaded from the server, it will be retrieved from the
     *     cache.
     * @param getRequest$
     * @param params
     */
    protected handleLocalDataModelGetList(getRequest$:Observable<Array<any>>, params?:TerraBaseParameterInterface):Observable<Array<any>>
    {
        if(Object.keys(this.dataModel).length > 0 && this._hasAllParamsLoaded(params))
        {
            return of(Object.values(this.dataModel));
        }

        return getRequest$.pipe(
            tap((dataList:Array<any>) =>
                dataList.forEach((data:any) =>
                {
                    this.dataModel[data.id] = Object.assign(data, this.dataModel[data.id]);
                })
            )
        );
    }

    /**
     * @description Handles the retrieval of a single entity. If it has been loaded from the server before, it will be retrieved from the
     *     cache.
     * @param getRequest$
     * @param dataId
     */
    protected handleLocalDataModelGet(getRequest$:Observable<any>, dataId:number | string):Observable<any>
    {
        if(!isNullOrUndefined(this.dataModel[dataId]))
        {
            return of(this.dataModel[dataId]);
        }

        return getRequest$.pipe(
            tap((data:any) => this.dataModel[dataId] = data)
        );
    }

    /**
     * @description Handles the creation of a single entity. If the creation is successful, the response is stored in the cache.
     * @param postRequest$
     * @param dataId
     */
    protected handleLocalDataModelPost(postRequest$:Observable<any>, dataId:number | string):Observable<any>
    {
        return postRequest$.pipe(
            tap((data:any) =>
            {
                if(isNullOrUndefined(this.dataModel[dataId]))
                {
                    this.dataModel[dataId] = [];
                }
                this.dataModel[dataId].push(data);
            })
        );
    }

    /**
     * @description Handles the modification of a single entity. If it has been updated successfully, the cache is updated with the
     *     response object.
     * @param putRequest$
     * @param dataId
     */
    protected handleLocalDataModelPut(putRequest$:Observable<any>, dataId:number | string):Observable<any>
    {
        return putRequest$.pipe(
            tap((data:any) =>
            {
                let dataToUpdate:any;

                if(!isNullOrUndefined(this.dataModel[dataId]))
                {
                    dataToUpdate = this.dataModel[dataId].find((dataItem:any) => dataItem.id === data.id);
                }

                if(!isNullOrUndefined(dataToUpdate))
                {
                    dataToUpdate = data;
                }
                else
                {
                    if(isNullOrUndefined(this.dataModel[dataId]))
                    {
                        this.dataModel[dataId] = [];
                    }
                    this.dataModel[dataId].push(data);
                }
            })
        );
    }

    /**
     * @description Handles the deletion of a single entity. If the deletion was successful, the entity is removed from the cache as well.
     * @param deleteRequest$
     * @param dataId
     */
    protected handleLocalDataModelDelete(deleteRequest$:Observable<void>, dataId:number | string):Observable<void>
    {
        return deleteRequest$.pipe(
            tap(() =>
            {
                Object.keys(this.dataModel).forEach((comparisonId:string) =>
                {
                    let dataIndex:number = this.dataModel[comparisonId].findIndex((data:any) => data.id === dataId);
                    if(dataIndex >= 0)
                    {
                        this.dataModel[comparisonId].splice(dataIndex, 1);
                    }
                });
            })
        );
    }

    private _hasAllParamsLoaded(params:TerraBaseParameterInterface):boolean
    {
        if(!isNullOrUndefined(params) && !isNullOrUndefined(params['with']))
        {
            return Object.values(this.dataModel).every((value:any) =>
            {
                return params['with'].every((param:string) => value.hasOwnProperty(param));
            });
        }
        else
        {
            return true;
        }
    }

}
