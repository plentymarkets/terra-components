import { Observable } from 'rxjs';
import { TerraBaseParameterInterface } from '../components/data/terra-base-parameter.interface';
import { of } from 'rxjs/observable/of';
import { isNullOrUndefined } from 'util';
import { tap } from 'rxjs/operators';
import { TerraKeyValueInterface } from '../models/terra-key-value.interface';

/**
 * @experimental
 * @description This class provides basic functionality to cache data accessible on a server
 */
// TODO: use Generic <T> to be able to pass a type def for everything
export class CachingBaseService
{
    protected dataModel:TerraKeyValueInterface<any> = {};

    protected handleLocalDataModelGetList(getRequest$:Observable<Array<any>>, params?:TerraBaseParameterInterface):Observable<Array<any>>
    {
        if(Object.keys(this.dataModel).length > 0 && this.hasAllParamsLoaded(params))
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

    private hasAllParamsLoaded(params:TerraBaseParameterInterface):boolean
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

    protected handleLocalDataModelGet(getRequest$:Observable<any>, dataId:number | string):Observable<any>
    {
        if(!isNullOrUndefined(this.dataModel[dataId]))
        {
            return Observable.of(this.dataModel[dataId]);
        }

        return getRequest$.pipe(
            tap((data:any) => this.dataModel[dataId] = data)
        );
    }

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
}
