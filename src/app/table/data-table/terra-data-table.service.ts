import { Injectable } from '@angular/core';
import { TerraBaseService } from '../../service/terra-base.service';
import { TerraLoadingSpinnerService } from '../../loading-spinner/service/terra-loading-spinner.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TerraPagerParameterInterface } from '../../pager/data/terra-pager.parameter.interface';

@Injectable()
export class TerraDataTableService extends TerraBaseService
{
    public isLoading:boolean;

    constructor(private _spinner:TerraLoadingSpinnerService,
                private _http:Http)
    {
        super(_spinner, _http, '');

        this.isLoading = false;
    }

    public getResults(params?:TerraPagerParameterInterface, orderBy?:string):Observable<any>
    {
        if(!(this.url && this.url.length > 0))
        {
            return null;
        }

        // add orderBy attribute to pager params
        if(params && orderBy)
        {
            params['orderBy'] = orderBy;
        }

        this.setAuthorization();

        this.isLoading = true;

        let call = this.mapRequest(
            this.http.get(
                this.url,
                {
                    headers: this.headers,
                    search: this.createUrlSearchParams(params)
                }
            )
        );

        call.subscribe(() => {this.isLoading = false;})

        return call;
    }
}