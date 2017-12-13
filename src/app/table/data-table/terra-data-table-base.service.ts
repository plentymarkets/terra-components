import { TerraBaseService } from '../../service/terra-base.service';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';
import { TerraPagerInterface } from '../../pager/data/terra-pager.interface';
import { TerraSelectBoxValueInterface } from '../../forms/select-box/data/terra-select-box.interface';

export abstract class TerraDataTableBaseService<T> extends TerraBaseService
{
    public requestPending:boolean;
    public onSuccessFunction:(res:Array<T>) => void;
    public pagingData:TerraPagerParameterInterface;
    public pagingSize:Array<TerraSelectBoxValueInterface>;
    public defaultPagingSize:number;

    public getResults(params?:TerraPagerParameterInterface, sortBy?:string):Observable<TerraPagerInterface>
    {
        // add sortBy attribute to pager params
        if(params && sortBy)
        {
            params['sortBy'] = sortBy;
        }

        // request table data from the server
        this.requestPending = true;
        let request = this.requestTableData(params);
        request.subscribe(
            (res:TerraPagerInterface) => this.onSuccessFunction(res.entries),
            (error:any) => {},
            () => this.requestPending = false
        );

        return request;
    }

    public abstract requestTableData(params?:TerraPagerParameterInterface):Observable<TerraPagerInterface>
}