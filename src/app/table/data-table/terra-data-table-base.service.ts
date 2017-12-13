import { TerraBaseService } from '../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

export abstract class TerraDataTableBaseService<T> extends TerraBaseService
{
    public requestPending:boolean;
    public onSuccessFunction:(res) => void;
    public pagingData:TerraPagerInterface<T>;
    public pagingSize:Array<TerraSelectBoxValueInterface>;
    public defaultPagingSize:number;

    //private _selectedRowList:Array<TerraDataTableRowInterface<D>> = [];

    public abstract getResults(params?:TerraPagerParameterInterface, orderBy?:string):Observable<TerraPagerInterface<T>>
}