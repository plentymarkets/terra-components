import { TerraDynamicLoadedComponentInputInterface } from '../../../dynamic-module-loader/data/terra-dynamic-loaded-component-input.interface';

export interface ResolvedDataInterface
{
    urlPart:string;
    resolves:Array<TerraDynamicLoadedComponentInputInterface>;
}
