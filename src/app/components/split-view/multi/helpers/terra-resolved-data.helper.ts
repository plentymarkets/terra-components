import { ResolvedDataInterface } from '../interfaces/resolved-data.interface';
import { isNullOrUndefined } from 'util';
import { TerraDynamicLoadedComponentInputInterface } from '../../../dynamic-module-loader/data/terra-dynamic-loaded-component-input.interface';
import { ResolverListItemInterface } from '../interfaces/resolve-list-item.interface';

export class TerraResolvedDataHelper
{
    public static addResolvedData(resolverListItem:ResolverListItemInterface,
                                  value:any,
                                  data:Array<ResolvedDataInterface>):Array<ResolvedDataInterface>
    {
        let resolveData:TerraDynamicLoadedComponentInputInterface = {
            name:  resolverListItem.resolver.key,
            value: value
        };

        let resolvedData:ResolvedDataInterface = {
            urlPart:  resolverListItem.urlPart,
            resolves: [resolveData]
        };

        if(isNullOrUndefined(data))
        {
            return [resolvedData];
        }

        let alreadyResolvedData:ResolvedDataInterface = this.findResolvedDataByUrlPart(resolverListItem.urlPart, data);
        if(alreadyResolvedData)
        {
            if(isNullOrUndefined(alreadyResolvedData.resolves))
            {
                alreadyResolvedData.resolves = [resolveData];
            }
            else
            {
                alreadyResolvedData.resolves.push(resolveData);
            }
        }
        else
        {
            data.push(resolvedData);
        }

        return data;
    }

    public static findResolvedDataByUrlPart(urlPart:string, resolvedDataList:Array<ResolvedDataInterface>):ResolvedDataInterface
    {
        if(isNullOrUndefined(urlPart) || isNullOrUndefined(resolvedDataList) || resolvedDataList.length === 0)
        {
            return undefined;
        }

        return resolvedDataList.find((resolvedData:ResolvedDataInterface) => resolvedData.urlPart === urlPart);
    }

    public static findInputDataByResolveKey(urlPart:string, resolveKey:string,
                                            resolvedDataList:Array<ResolvedDataInterface>):TerraDynamicLoadedComponentInputInterface
    {
        let resolvedData:ResolvedDataInterface = this.findResolvedDataByUrlPart(urlPart, resolvedDataList);

        if(isNullOrUndefined(resolveKey))
        {
            return undefined;
        }

        return resolvedData.resolves.find((input:TerraDynamicLoadedComponentInputInterface) =>
            input.name === resolveKey
        );
    }
}
